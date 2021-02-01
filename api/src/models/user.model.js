const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose)

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  nickname: String,
  phone: String,
  city: String,
  referralCode: String,
  refer: {type: String, default: null},
  bonus: {type: Float, default: 0.00},
  history: {type: Array, default: [] },
  isAdmin: {type: Boolean, default: false},
  check: {
    email: {
      status: {type: Boolean, default: false},
      hash: {type: String, default: ''}
    },
    pass: {type: String, default: ''}
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
