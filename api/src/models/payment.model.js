const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const PaymentSchema = new mongoose.Schema({
  status: {type: String, default: 'Оплаченно'},
  timeStamp: Number,
  shipping: String,
  body: Array,
  dontCall: Boolean,
  account: String,
  price: {
    currency: String,
    payment: String,
    coupon: Object,
    subtotal: {
      uah: Float,
      usd: Float
    },
    shipping: Float,
    total: {
      uah: Float,
      usd: Float
    }
  },
  info: {
    firstName: String,
    lastName: String,
    country: String,
    city: String,
    stateProvince: String,
    address: String,
    apartment: String,
    zipCode: String,
    email: String,
    phone: String
  }
})

const Payment = mongoose.model('Payment', PaymentSchema)

module.exports = Payment
