const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed'],
    default: 'pending',
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  webhook: { type: mongoose.Schema.Types.ObjectId, ref: 'Webhook' },
  outputCsv: { type: String, unique: true },
})

module.exports = mongoose.model('Request', requestSchema)
