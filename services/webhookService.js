// services/webhookService.js
const axios = require('axios')
const Webhook = require('../models/webhook')
const Request = require('../models/request')
const { SERVER_URL } = require('../constant')

// services/webhookService.js
const sendWebhook = async (request, csvFilePath) => {
  const webhook = await Webhook.findById(request.webhook)
  if (!webhook) return

  const products = await Request.findById(request._id).populate('products')
  const data = {
    requestId: request.requestId,
    status: request.status,
    products: products.products,
    csvFileUrl: `${SERVER_URL}/${path.basename(csvFilePath)}`,
  }

  try {
    await axios.post(webhook.url, data)
  } catch (error) {
    console.error('Failed to send webhook:', error.message)
  }
}

module.exports = { sendWebhook }

module.exports = { sendWebhook }
