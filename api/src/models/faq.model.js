const mongoose = require('mongoose')

const FAQSchema = new mongoose.Schema({
  title: {
    ru: String,
    en: String
  },
  text: {
    ru: String,
    en: String
  }
})

const FAQ = mongoose.model('FAQ', FAQSchema)

module.exports = FAQ
