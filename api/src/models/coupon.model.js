const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema({
  coupon: String,
  sale: Number
})

const Coupon = mongoose.model('Coupon', CouponSchema)

module.exports = Coupon
