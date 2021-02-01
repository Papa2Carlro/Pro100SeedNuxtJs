// eslint-disable
// Model
const newPayment = require('../models/new-payment.model')

// Create newPayment
exports.createNewPayment = async function () {
  // eslint-disable-next-line new-cap
  const counter = new newPayment({
    newPayment: 0
  })

  try {
    return await counter.save()
  } catch (err) {
    throw err
  }
}

// Create newPayment
exports.getNewPayment = async function () {
  try {
    const [_detail] = await newPayment.find()
    if (!_detail) { return 'not_found' }

    return _detail.newPayment
  } catch (err) {
    throw err
  }
}

// Edit newPayment
exports.addNewPayment = async function (zero) {
  try {
    const [_detail] = await newPayment.find()
    if (!_detail) { return 'not_found' }

    const count = _detail.newPayment + 1

    if (zero) {
      await newPayment.findOneAndUpdate({newPayment: _detail.newPayment}, {newPayment: 0}, {returnOriginal: false})
      return 0
    } else {
      await newPayment.findOneAndUpdate({newPayment: _detail.newPayment}, {newPayment: count}, {returnOriginal: false})
      return count
    }
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}
