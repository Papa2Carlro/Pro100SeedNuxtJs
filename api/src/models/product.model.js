const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: String,
  price: {
    uah: Number,
    usd: Number
  },
  newPrice: {
    uah: {type: Number, default: null},
    usd: {type: Number, default: null}
  },
  pictures: Array,
  general: {
    manufacturer: String,
    variety: String,
    flowering: {
      from: Number,
      to: Number
    },
    thc: {
      from: Number,
      to: Number
    },
    genetics: String,
    harvest: {
      filter: String,
      from: Number,
      to: Number
    },
    productivity: {
      from: Number,
      to: Number
    },
    height: {
      sm: String,
      filter: String
    },
    bloom: String,
    power: String,
    fem: String,
    place: String,
    taste: Array,
    effect: Array,
    exclusive: Boolean
  },
  visible: {type: Boolean, default: true},
  description: {
    html: {
      ru: String,
      en: String
    },
    image: String
  },
  comments: {type: Array, default: [] },
  popularity: {type: Number, default: 0}
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
