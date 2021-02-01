// eslint-disable
// Model
const Product = require('../models/product.model')

exports.getProductById = async function (id, callback) {
  await Product.findById(id, callback)
}

exports.getProductByName = async function (title, callback) {
  const query = {name: title}
  await Product.findOne(query, callback)
}

// Create Product
exports.createProduct = async function (product) {
  // Creating a new Mongoose Object by using the new keyword
  const newProduct = new Product({
    name: product.name,
    price: {
      uah: product.price.uah,
      usd: product.price.usd
    },
    newPrice: {
      uah: product.newPrice.uah,
      usd: product.newPrice.usd
    },
    pictures: product.pictures,
    general: {
      manufacturer: product.general.manufacturer,
      variety: product.general.variety,
      flowering: product.general.flowering,
      thc: product.general.thc,
      genetics: product.general.genetics,
      harvest: {
        filter: product.general.harvest.filter,
        from: product.general.harvest.from,
        to: product.general.harvest.to
      },
      productivity: product.general.productivity,
      height: {
        sm: product.general.height.sm,
        filter: product.general.height.filter
      },
      bloom: product.general.bloom,
      power: product.general.power,
      fem: product.general.fem,
      place: product.general.place,
      taste: product.general.taste,
      effect: product.general.effect,
      exclusive: product.general.exclusive
    },
    description: {
      html: {
        ru: product.description.html.ru,
        en: product.description.html.en
      },
      image: product.description.image
    }
  })

  try {
    // Saving the Product
    await newProduct.save()
  } catch (err) {
    // return a Error
    throw err
  }
}

// Get Visible Product
exports.getVisibleProducts = async function () {
  try {
    const _detail = await Product.find({visible: true})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Get All Product
exports.getProducts = async function () {
  try {
    const _detail = await Product.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit Product
exports.editProduct = async function (id, newProduct) {
  try {
    const _detail = await Product.findOne({_id: id})
    if (!_detail) { throw 'Product not found' }

    await Product.findOneAndUpdate({_id: id}, newProduct, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Enable and disabled Product
exports.EnableDisableProduct = async function (id, bool) {
  try {
    const _detail = await Product.findOne({_id: id})
    if (!_detail) { throw 'Product not found' }

    await Product.findOneAndUpdate({_id: id}, {visible: bool}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.removeProduct = async function (id) {
  // Delete the Product
  try {
    const deleted = await Product.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete product' }

    return deleted
  } catch (err) {
    throw err
  }
}

// --------------------------------------------------------------------
// Comments

exports.getComments = async function (id) {
  try {
    const _detail = await Product.findOne({_id: id})
    if (!_detail) { throw 'Product not found' }

    return _detail.comments
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.addComments = async function (id, comments) {
  comments._id = Date.now()

  try {
    const _detail = await Product.findOne({_id: id})
    if (!_detail) { throw 'Product not found' }

    const commentsList = _detail.comments
    commentsList.push(comments)

    await Product.findOneAndUpdate({_id: id}, {comments: commentsList}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.editComments = async function (id, comments) {
  try {
    const _detail = await Product.findOne({_id: id})
    if (!_detail) { throw 'Product not found' }

    const commentsList = _detail.comments

    commentsList.map((item) => {
      if (item._id.toString() === comments._id) {
        item.body = comments.body
        item.rate = comments.rate
      }
    })

    await Product.findOneAndUpdate({_id: id}, {comments: commentsList}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.deleteComments = async function (id, commentsId) {
  try {
    const _detail = await Product.findOne({_id: id})
    if (!_detail) { throw 'Product not found' }

    const commentsList = _detail.comments.filter(comment => comment._id !== commentsId)

    await Product.findOneAndUpdate({_id: id}, {comments: commentsList}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}
