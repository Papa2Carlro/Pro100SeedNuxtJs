// eslint-disable
// Model
const Post = require('../models/post.model')

exports.getPostById = async function (id, callback) {
  await Post.findById(id, callback)
}
exports.getPostByTitle = async function (titleEn, callback) {
  await Post.findOne({titleEn}, callback)
}

// Create Product
exports.createPost = async function (post) {
  // Creating a new Mongoose Object by using the new keyword
  const newPost = new Post({
    category: post.category,
    title: {
      ru: post.title.ru,
      en: post.title.en
    },
    picture: post.picture,
    body: {
      image: post.body.image,
      html: {
        ru: post.body.html.ru,
        en: post.body.html.en
      }
    },
    author: post.author,
    timeStamp: Date.now()
  })

  try {
    // Saving the Product
    await newPost.save()
  } catch (err) {
    // return a Error
    throw err
  }
}

// Get All Post
exports.getPost = async function () {
  try {
    const _detail = await Post.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit Product
exports.editPost = async function (id, newPost) {
  try {
    const _detail = await Post.findOne({_id: id})
    if (!_detail) { throw 'Post not found' }

    await Post.findOneAndUpdate({_id: id}, newPost, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.removePost = async function (id) {
  // Delete the Post
  try {
    const deleted = await Post.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete post' }

    return deleted
  } catch (err) {
    throw err
  }
}
