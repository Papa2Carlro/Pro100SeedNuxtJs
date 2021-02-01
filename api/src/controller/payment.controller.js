// eslint-disable
// Services
const PaymentServices = require('../services/payment.services')
const MailerServices = require('../services/mailer.services')
const newPayment = require('../services/new-payment.services')

// Add Payment Controller
exports.createPayment = async function (req, res) {
  const refer = req.body.info.refer
  const newsletters = req.body.actions.newsletters
  const loginEmail = req.body.isLogin

  // Req.Body contains the form submit values.
  const Payment = {
    shipping: req.body.shipping,
    body: req.body.body,
    dontCall: req.body.actions.dontCall,
    account: loginEmail,
    price: {
      currency: req.body.price.currency,
      payment: req.body.price.payment,
      coupon: req.body.price.coupon,
      subtotal: req.body.price.subtotal,
      shipping: req.body.price.shipping,
      total: req.body.price.total
    },
    info: {
      firstName: req.body.info.firstName,
      lastName: req.body.info.lastName,
      country: req.body.info.country,
      city: req.body.info.city,
      stateProvince: req.body.info.stateProvince,
      address: req.body.info.address,
      apartment: req.body.info.apartment,
      zipCode: req.body.info.zipCode,
      email: req.body.info.email,
      phone: req.body.info.phone
    }
  }

  try {
    if (newsletters) {
      await MailerServices.addEmail(Payment.info.email)
    }

    const response = await newPayment.addNewPayment()

    if (response === 'not_found') {
      await newPayment.createNewPayment()
      await newPayment.addNewPayment()
    }

    // Calling the Service function with the new object from the Request Body
    await PaymentServices.createPayment(Payment, refer, loginEmail)
    return res.status(201).json({ok: true, msg: 'Заказ успешно добавлен!'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get New Payment
exports.getNewPayments = async function (req, res) {
  try {
    const count = await newPayment.getNewPayment()
    return res.status(201).json({ok: true, body: count})
  } catch (err) {
  // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

exports.resetCounter = async function (req, res) {
  try {
    await newPayment.addNewPayment('zero')
    return res.status(201).json({ok: true, msg: 'Обнуление'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get All Payment
exports.getPayments = async function (req, res) {
  try {
    const payment = await PaymentServices.getPayments()
    if (payment.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: payment})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Get Payment
exports.getPayment = async function (req, res) {
  const id = req.params.id

  try {
    const payment = await PaymentServices.getPayment(id)
    if (payment.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: payment})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Change Status Payment
exports.changeStatusPayment = async function (req, res) {
  const id = req.params.id
  const status = req.body.status

  try {
    await PaymentServices.changeStatusPayment(id, status)
    return res.status(200).json({ok: true, msg: 'Статус изменен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Remove Or revoke
exports.removeRevokePayment = async function (req, res) {
  const id = req.params.id
  const action = req.body.action

  try {
    await PaymentServices.removeRevokePayment(id, action)
    return res.status(200).json({ok: true, msg: `Заказ ${action === 'revoke' ? 'отменен' : 'удален'}`})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
