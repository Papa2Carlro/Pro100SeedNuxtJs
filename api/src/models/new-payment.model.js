const mongoose = require('mongoose')

const newPaymentSchema = new mongoose.Schema({
  newPayment: Number
})

const newPayment = mongoose.model('newPayment', newPaymentSchema)

module.exports = newPayment
