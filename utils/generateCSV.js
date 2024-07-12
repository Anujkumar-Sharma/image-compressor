// utils/generateCSV.js
const fs = require('fs')
const path = require('path')
const { Parser } = require('json2csv')
const { SERVER_URL } = require('../constant')

const generateCSV = (products, requestId) => {
  const fields = [
    'serialNumber',
    'productName',
    'inputImageUrls',
    'outputImageUrls',
  ]
  const opts = { fields, unwind: ['inputImageUrls', 'outputImageUrls'] }

  const csvData = products.map((product) => ({
    serialNumber: product.serialNumber,
    productName: product.productName,
    inputImageUrls: product.inputImageUrls.join(','),
    outputImageUrls: product.outputImageUrls.join(','),
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
