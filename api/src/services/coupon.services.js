// eslint-disable
const crypto = require('crypto')

// Model
const Coupon = require('../models/coupon.model')

exports.getCouponById = async function (id, callback) {
  await Coupon.findById(id, callback)
}
exports.getCouponByBody = async function (coupon, callback) {
  await Coupon.findOne({coupon}, callback)
}

// Create Coupon
exports.createCoupon = async function (coupon) {
  const createCoupon = await crypto.randomBytes(8).toString('hex').toUpperCase()

  // Creating a new Mongoose Object by using the new keyword
  const newCoupon = new Coupon({
    coupon: createCoupon,
    sale: coupon.sale
  })

  try {
    // Saving the Product
    return await newCoupon.save()
  } catch (err) {
    // return a Error
    throw err
  }
}

// Get All Coupons
exports.getCoupons = async function () {
  try {
    const _detail = await Coupon.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit Coupon
exports.editCoupon = async function (id, newPost) {
  try {
    const _detail = await Coupon.findOne({_id: id})
    if (!_detail) {
      throw 'Coupon not found'
    }

    await Coupon.findOneAndUpdate({_id: id}, newPost, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.removeCoupon = async function (id) {
  // Delete the Coupon
  try {
    const deleted = await Coupon.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) {
      throw 'Failed to delete coupon'
    }

    return deleted
  } catch (err) {
    throw err
  }
}
