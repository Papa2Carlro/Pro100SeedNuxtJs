// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const ShippingController = require('../../controller/shipping.controller')

// GET
/**
 *
 * @description Get shipping
 * */
// api/shipping
router.get('/', ShippingController.getShipping)

// POST
/**
 *
 * @body Shipping Obj
 * @description Creates a new Shipping methods
 * */
// api/shipping
router.post('/', passport.authenticate('jwt', {session: false}), ShippingController.createShipping)

// PUT
/**
 *
 * @param Id Shipping
 * @body Shipping Obj
 * @description Edit a Shipping by its id
 * */
// api/shipping/:id
router.put('/:id', passport.authenticate('jwt', {session: false}), ShippingController.editShipping)

// DELETE
/**
 * @param Id Shipping
 * @description Removes a Shipping by its id
 * */
// api/shipping/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), ShippingController.deleteShipping)

// Export the Router
module.exports = router
