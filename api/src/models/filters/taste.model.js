const mongoose = require('mongoose')

const TasteSchema = new mongoose.Schema({
  name: {
    ru: String,
    en: String
  },
  svg: String,
  filterId: String
})

const Taste = mongoose.model('Taste', TasteSchema)

module.exports = Taste
