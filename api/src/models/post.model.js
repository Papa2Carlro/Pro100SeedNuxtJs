const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  category: String,
  title: {
    ru: String,
    en: String
  },
  picture: String,
  body: {
    image: Array,
    html: {
      ru: String,
      en: String
    }
  },
  author: {type: String, default: ''},
  timeStamp: Number
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
