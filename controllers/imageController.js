// controllers/imageController.js
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const validateCSV = require('../utils/validateCSV')
const Product = require('../models/product')
const Request = require('../models/request')
const { processImage } = require('../services/imageService')
const path = require('path')
const generateCSV = require('../utils/generateCSV')

const sleep = (ms) => {
  return new Promise((resolve) => setInterval(resolve, ms))
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

// uploadCSV function
const uploadCSV = async (req, res) => {
  const filePath = req.file.path
  const webhookUrl = req.body.webhookUrl
  try {
    const csvData = await validateCSV(filePath)
    const requestId = uuidv4()

    const products = csvData.map((item) => ({
      serialNumber: item.serialNumber,
      productName: item.productName,
      inputImageUrls: item.inputImageUrls,
    }))

    const createdProducts = await Product.insertMany(products)
    const productIds = createdProducts.map((p) => p._id)

    const newRequest = new Request({
      requestId,
      products: productIds,
    })

    if (webhookUrl) {
      const webhook = new Webhook({
        url: webhookUrl,
        requestId: newRequest._id,
      })
      await webhook.save()
      newRequest.webhook = webhook._id
    }

    await newRequest.save()

    res.status(202).json({ requestId })

    processImagesAsync(newRequest)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const processImagesAsync = async (request) => {
  request.status = 'processing'
  await request.save()
  await sleep(30000)
  const products = await Product.find({ _id: { $in: request.products } })
  const updatePromises = products.map(async (product) => {
    const outputUrls = await Promise.all(
      product.inputImageUrls.map(processImage),
    )
    product.outputImageUrls = outputUrls
    return product.save()
  })

  await Promise.all(updatePromises)

  // Generate the CSV file
  const csvFilePath = generateCSV(products, request.requestId)
  request.status = 'completed'
  request.outputCsv = csvFilePath
  await request.save()

  // Trigger webhook here
  if (request.webhook) {
    await sendWebhook(request, csvFilePath)
  }
}

const getStatus = async (req, res) => {
  const { requestId } = req.params
  const request = await Request.findOne({ requestId }).populate('products')
  if (!request) {
    return res.status(404).json({ error: 'Request not found' })
  }
  res.json(request)
}

module.exports = { upload, uploadCSV, getStatus }
