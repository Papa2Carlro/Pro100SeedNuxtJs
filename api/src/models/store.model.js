const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema({
  title: String,
  country: String,
  address: String,
  lat: String,
  lng: String
})

const Store = mongoose.model('Store', CouponSchema)

module.exports = Store
