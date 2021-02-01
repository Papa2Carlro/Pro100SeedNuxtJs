// eslint-disable
// Services
const CouponServices = require('../services/coupon.services')

// Add Post Controller
exports.createCoupon = async function (req, res) {
  let errField = {}

  // Req.Body contains the form submit values.
  const Coupon = {
    sale: req.body.sale
  }

  try {
    // Empty Field
    if (!Coupon.sale) { errField.sale = 'Required field' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    // Calling the Service function with the new object from the Request Body
    const coupon = await CouponServices.createCoupon(Coupon)
    return res.status(201).json({ok: true, msg: 'Coupon successfully created', body: coupon})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get All Coupons
exports.getCoupons = async function (req, res) {
  try {
    const coupon = await CouponServices.getCoupons()
    if (coupon.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: coupon})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Get Coupon By Body
exports.getCouponByBody = async function (req, res) {
  const coupon = req.body.coupon

  try {
    await CouponServices.getCouponByBody(coupon, (err, coupon) => {
      if (!coupon) { return res.json({ok: false, msg: 'Not found'}) }
      return res.status(200).json({ok: true, body: coupon.sale})
    })
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Edit Coupon Controller
exports.editCoupon = async function (req, res) {
  const id = req.params.id
  let errField = {}

  // Req.Body contains the form submit values.
  const Coupon = {
    sale: req.body.sale
  }

  try {
    // Empty Field
    if (!Coupon.sale) { errField.category = 'Required field' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    // Calling the Service function with the new object from the Request Body
    await CouponServices.editCoupon(id, Coupon)
    return res.status(201).json({ok: true, msg: 'Coupon successfully edit'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Remove Coupon Controller
exports.removeCoupon = async function (req, res) {
  const id = req.params.id

  try {
    await CouponServices.removeCoupon(id)
    return res.status(200).json({ok: true, msg: 'Coupon removed'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
