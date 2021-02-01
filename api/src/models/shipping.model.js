const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const ShippingSchema = new mongoose.Schema({
  title: String,
  price: {
    uah: Float,
    usd: Float
  },
  shipping: {
    from: Number,
    to: Number
  }
})

const Shipping = mongoose.model('Shipping', ShippingSchema)

module.exports = Shipping
