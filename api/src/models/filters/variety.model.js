const mongoose = require('mongoose')

const VarietySchema = new mongoose.Schema({
  name: {
    ru: String,
    en: String
  },
  filterId: String
})

const Variety = mongoose.model('Variety', VarietySchema)

module.exports = Variety
