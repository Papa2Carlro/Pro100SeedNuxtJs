const mongoose = require('mongoose')

const EffectSchema = new mongoose.Schema({
  name: {
    ru: String,
    en: String
  },
  svg: String,
  filterId: String
})

const Effect = mongoose.model('Effect', EffectSchema)

module.exports = Effect
