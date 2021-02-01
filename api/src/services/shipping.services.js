// eslint-disable
// Model
const Shipping = require('../models/shipping.model')

// Getters
exports.getShippingById = async function (id, callback) {
  await Shipping.findById(id, callback)
}

// Create Shipping
exports.createShipping = async function (shipping) {
  const newShipping = new Shipping({
    title: shipping.title,
    price: {
      uah: shipping.price.uah,
      usd: shipping.price.usd
    },
    shipping: {
      from: shipping.shipping.from,
      to: shipping.shipping.to
    }
  })

  try {
    return await newShipping.save()
  } catch (err) {
    throw err
  }
}

// Get All Shipping
exports.getShipping = async function () {
  try {
    const _detail = await Shipping.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit Shipping
exports.editShipping = async function (id, newShipping) {
  try {
    const _detail = await Shipping.findOne({_id: id})
    if (!_detail) { throw 'Shipping not found' }

    await Shipping.findOneAndUpdate({_id: id}, newShipping, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.deleteShipping = async function (id) {
  // Delete the Shipping
  try {
    const deleted = await Shipping.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete Shipping' }

    return deleted
  } catch (err) {
    throw err
  }
}
