const mongoose = require('mongoose')

const PageSchema = new mongoose.Schema({
  name: String,
  html: {
    ru: String,
    en: String
  }
})

const Page = mongoose.model('Page', PageSchema)

module.exports = Page
