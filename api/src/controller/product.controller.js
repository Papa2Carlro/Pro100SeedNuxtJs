// eslint-disable
// Services
const ProductServices = require('../services/product.services')

// Add Product Controller
exports.createProduct = async function (req, res) {
  let errField = ''

  // Req.Body contains the form submit values.
  const Product = {
    name: req.body.name,
    price: {
      uah: req.body.price.uah,
      usd: req.body.price.usd
    },
    newPrice: {
      uah: req.body.newPrice.uah,
      usd: req.body.newPrice.usd
    },
    pictures: req.body.pictures,
    general: {
      manufacturer: req.body.general.manufacturer,
      variety: req.body.general.variety,
      flowering: {
        from: req.body.general.flowering.from,
        to: req.body.general.flowering.to
      },
      thc: req.body.general.thc,
      genetics: req.body.general.genetics,
      harvest: {
        filter: req.body.general.harvest.filter,
        from: req.body.general.harvest.from,
        to: req.body.general.harvest.to
      },
      productivity: {
        from: req.body.general.productivity.from,
        to: req.body.general.productivity.to
      },
      height: {
        sm: req.body.general.height.sm,
        filter: req.body.general.height.filter
      },
      bloom: req.body.general.bloom,
      power: req.body.general.power,
      fem: req.body.general.fem,
      place: req.body.general.place,
      taste: req.body.general.taste,
      effect: req.body.general.effect,
      exclusive: req.body.general.exclusive
    },
    description: {
      html: {
        ru: req.body.description.html.ru,
        en: req.body.description.html.en
      },
      image: req.body.description.image
    }
  }

  try {
    // Error Event
    await ProductServices.getProductByName(Product.name, (err, product) => {
      if (product) { errField = 'Такое имя уже существует' }
    })

    // Throw out the error
    if (errField) { throw errField }

    // Calling the Service function with the new object from the Request Body
    await ProductServices.createProduct(Product)
    return res.status(201).json({ok: true, msg: 'Продукт создан!'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get Products
exports.getAllProducts = async function (req, res) {
  try {
    const products = await ProductServices.getVisibleProducts()

    if (products.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: products})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Get Products
exports.getAdminProducts = async function (req, res) {
  try {
    const products = await ProductServices.getProducts()

    if (products.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: products})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Get Product By Id
exports.getProductById = async function (req, res) {
  const id = req.params.id

  try {
    await ProductServices.getProductById(id, (err, product) => {
      return res.status(200).json({ok: true, body: product})
    })
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Edit Product Controller
exports.editProduct = async function (req, res) {
  const id = req.params.id
  let errField = ''

  // Req.Body contains the form submit values.
  const Product = {
    name: req.body.name,
    price: {
      uah: req.body.price.uah,
      usd: req.body.price.usd
    },
    newPrice: {
      uah: req.body.newPrice.uah,
      usd: req.body.newPrice.usd
    },
    pictures: req.body.pictures,
    general: {
      manufacturer: req.body.general.manufacturer,
      variety: req.body.general.variety,
      flowering: {
        from: req.body.general.flowering.from,
        to: req.body.general.flowering.to
      },
      thc: req.body.general.thc,
      genetics: req.body.general.genetics,
      harvest: {
        filter: req.body.general.harvest.filter,
        from: req.body.general.harvest.from,
        to: req.body.general.harvest.to
      },
      productivity: {
        from: req.body.general.productivity.from,
        to: req.body.general.productivity.to
      },
      height: {
        sm: req.body.general.height.sm,
        filter: req.body.general.height.filter
      },
      bloom: req.body.general.bloom,
      power: req.body.general.power,
      fem: req.body.general.fem,
      place: req.body.general.place,
      taste: req.body.general.taste,
      effect: req.body.general.effect,
      exclusive: req.body.general.exclusive
    },
    description: {
      html: {
        ru: req.body.description.html.ru,
        en: req.body.description.html.en
      },
      image: req.body.description.image
    }
  }

  try {
    // Error Event
    await ProductServices.getProductByName(Product.name, (err, product) => {
      if (product) {
        if (product.id !== id) { errField = 'Такое имя уже используется' }
      }
    })

    // Throw out the error
    if (errField) { throw errField }

    await ProductServices.editProduct(id, Product)
    return res.status(200).json({ok: true, msg: 'Продукт отредактирован'})
  } catch (err) {
    console.log(err)
    return res.json({ok: false, msg: err})
  }
}

exports.EnableDisableProduct = async function (req, res) {
  const id = req.params.id
  const bool = req.body.visible

  try {
    await ProductServices.EnableDisableProduct(id, bool)
    return res.status(200).json({ok: true, msg: `Продукт ${bool ? 'включен' : 'выключен'}`})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Remove Product Controller
exports.removeProduct = async function (req, res) {
  const id = req.params.id

  try {
    await ProductServices.removeProduct(id)
    return res.status(200).json({ok: true, msg: 'Продукт удален'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// --------------------------------------------------------------------
// Comments

exports.getComments = async function (req, res) {
  const id = req.params.id

  try {
    await ProductServices.getComments(id)
    return res.status(200).json({ok: true, msg: 'Комментарии получены'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

exports.addComments = async function (req, res) {
  const id = req.params.id

  const comment = {
    author: {
      name: req.body.author.name,
      _id: req.body.author._id
    },
    body: req.body.body,
    rate: req.body.rate
  }

  try {
    await ProductServices.addComments(id, comment)
    return res.status(200).json({ok: true, msg: 'Комментарий добавлен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

exports.editComments = async function (req, res) {
  const id = req.params.id

  const comment = {
    author: {
      _id: req.body.author._id
    },
    body: req.body.body,
    rate: req.body.rate,
    _id: req.body._id
  }

  try {
    await ProductServices.editComments(id, comment)
    return res.status(200).json({ok: true, msg: 'Комментарий изменен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

exports.deleteComments = async function (req, res) {
  const id = req.params.id
  const commentId = req.body._id

  try {
    await ProductServices.deleteComments(id, commentId)
    return res.status(200).json({ok: true, msg: 'Комментарий удален'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
