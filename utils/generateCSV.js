// utils/generateCSV.js
const fs = require('fs')
const path = require('path')
const { Parser } = require('json2csv')
const { SERVER_URL } = require('../constant')

const generateCSV = (products, requestId) => {
  const fields = [
    'S. No.',
    'Product Name',
    'Input Image Urls',
    'Output Image Urls',
  ]
  const opts = { fields, unwind: ['Input Image Urls', 'Output Image Urls'] }

  const csvData = products.map((product) => ({
    ['S. No.']: product.serialNumber,
    ['Product Name']: product.productName,
    ['Input Image Urls']: product.inputImageUrls.join(','),
    ['Output Image Urls']: product.outputImageUrls.join(','),
  }))

  try {
    const parser = new Parser(opts)
    const csv = parser.parse(csvData)
    const filePath = path.join(__dirname, '../uploads', `${requestId}.csv`)
    fs.writeFileSync(filePath, csv)
    return `${SERVER_URL}/${requestId}.csv`
  } catch (err) {
    console.error('Error generating CSV:', err)
    throw err
  }
}

module.exports = generateCSV
