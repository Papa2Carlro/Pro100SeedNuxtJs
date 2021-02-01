const mongoose = require('mongoose')

const GeneticSchema = new mongoose.Schema({
  name: {
    ru: String,
    en: String
  },
  filterId: String
})

const Genetic = mongoose.model('Genetic', GeneticSchema)

module.exports = Genetic
