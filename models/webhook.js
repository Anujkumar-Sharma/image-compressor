const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema({
    url: { type: String, required: true },
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
});

module.exports = mongoose.model('Webhook', webhookSchema);
