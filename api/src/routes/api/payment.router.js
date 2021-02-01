// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const PaymentController = require('../../controller/payment.controller')

// GET
/**
 *
 * @description Getter payments
 * */
// api/payment/all
router.get('/all', passport.authenticate('jwt', {session: false}), PaymentController.getPayments)

/**
 *
 * @description Getter payments
 * */
// api/payment/all/:id
router.get('/all/:id', passport.authenticate('jwt', {session: false}), PaymentController.getPayment)

/**
 *
 * @description Getter new payment
 * */
// api/payment/new
router.get('/new', PaymentController.getNewPayments)

/**
 *
 * @description Reset Counter
 * */
// api/payment/new/reset
router.get('/new/reset', passport.authenticate('jwt', {session: false}), PaymentController.resetCounter)

// POST
/**
 *
 * @body Payment Obj
 * @description Creates a new Payment
 * */
// api/payment/create
router.post('/create', PaymentController.createPayment)

/**
 *
 * @body Payment Obj
 * @description Change Payment Status
 * */
// api/payment/status/:id
router.post('/status/:id', passport.authenticate('jwt', {session: false}), PaymentController.changeStatusPayment)

/**
 *
 * @body Payment Obj
 * @description Change Payment Status
 * */
// api/payment/revoke/:id
router.post('/revoke/:id', passport.authenticate('jwt', {session: false}), PaymentController.removeRevokePayment)

// Export the Router
module.exports = router
