const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  productName: { type: String, required: true },
  inputImageUrls: [String],
  outputImageUrls: [String],
})

module.exports = mongoose.model('Product', productSchema)
