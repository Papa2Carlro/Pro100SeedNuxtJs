// eslint-disable
// Services
const ShippingService = require('../services/shipping.services')

// Shipping Create Controller
exports.createShipping = async function (req, res) {
  const shipping = {
    title: req.body.title,
    price: {
      uah: req.body.price.uah,
      usd: req.body.price.usd
    },
    shipping: {
      from: req.body.shipping.from,
      to: req.body.shipping.to
    }
  }

  try {
    const Shipping = await ShippingService.createShipping(shipping)
    return res.status(201).json({ok: true, msg: 'Метод доставки успешно добавлен', body: Shipping})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get All Shipping
exports.getShipping = async function (req, res) {
  try {
    const Shipping = await ShippingService.getShipping()
    if (Shipping.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: Shipping})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Shipping Edit Controller
exports.editShipping = async function (req, res) {
  const id = req.params.id

  const shipping = {
    title: req.body.title,
    price: {
      uah: req.body.price.uah,
      usd: req.body.price.usd
    },
    shipping: {
      from: req.body.shipping.from,
      to: req.body.shipping.to
    }
  }

  try {
    await ShippingService.editShipping(id, shipping)
    return res.status(201).json({ok: true, msg: 'Метод доставки успешно изменен'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Delete Shipping Controller
exports.deleteShipping = async function (req, res) {
  const id = req.params.id

  try {
    await ShippingService.deleteShipping(id)
    return res.status(200).json({ok: true, msg: 'Метод доставки уничтожен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
