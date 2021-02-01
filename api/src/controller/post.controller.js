// eslint-disable
// Services
const PostServices = require('../services/post.services')

// Add Post Controller
exports.createPost = async function (req, res) {
  let errField = {}

  // Req.Body contains the form submit values.
  const Post = {
    category: req.body.category,
    title: {
      ru: req.body.title.ru,
      en: req.body.title.en
    },
    picture: req.body.picture,
    body: {
      image: req.body.body.image,
      html: {
        ru: req.body.body.html.ru,
        en: req.body.body.html.en
      }
    },
    author: req.body.author
  }

  try {
    // Error Event
    await PostServices.getPostByTitle(Post.title.en, (err, post) => {
      if (post) { errField.name = 'This title already exists!' }
    })
    // Empty Field
    if (!Post.picture) { errField.picture = 'Preview photo required' }
    if (Post.body.image.length === 0) { errField.images = 'Required one picture' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    // Calling the Service function with the new object from the Request Body
    await PostServices.createPost(Post)
    return res.status(201).json({ok: true, msg: 'Пост успешно создан!'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get All Post
exports.getPost = async function (req, res) {
  try {
    const post = await PostServices.getPost()

    if (post.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: post})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Get Product By Id
exports.getPostById = async function (req, res) {
  const id = req.params.id

  try {
    await PostServices.getPostById(id, (err, post) => {
      return res.status(200).json({ok: true, body: post})
    })
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Edit post
exports.editPost = async function (req, res) {
  const id = req.params.id
  let errField = {}

  // Req.Body contains the form submit values.
  const Post = {
    category: req.body.category,
    title: {
      ru: req.body.title.ru,
      en: req.body.title.en
    },
    picture: req.body.picture,
    body: {
      image: req.body.body.image,
      html: {
        ru: req.body.body.html.ru,
        en: req.body.body.html.en
      }
    },
    author: req.body.author
  }

  try {
    // Error Event
    await PostServices.getPostByTitle(Post.title.en, (err, post) => {
      if (post) {
        if (post.id !== id) { errField.name = 'This name already exists!' }
      }
    })

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    // Calling the Service function with the new object from the Request Body
    await PostServices.editPost(id, Post)
    return res.status(201).json({ok: true, msg: 'Пост успешно отредактирован'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Remove Post Controller
exports.removePost = async function (req, res) {
  const id = req.params.id

  try {
    await PostServices.removePost(id)
    return res.status(200).json({ok: true, msg: 'Пост удален'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
