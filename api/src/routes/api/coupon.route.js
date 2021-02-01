// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const CouponController = require('../../controller/coupon.controller')

// GET
/**
 *
 * @description Get all post
 * */
// api/coupon/all
router.get('/all', passport.authenticate('jwt', {session: false}), CouponController.getCoupons)

// POST
/**
 *
 * @body Coupon Obj
 * @description Creates a new Coupon
 * */
// api/coupon/create
router.post('/create', CouponController.createCoupon)

/**
 *
 * @param Body Coupon
 * @description Get Coupon by id
 * */
// api/coupon/
router.post('/', CouponController.getCouponByBody)

// PUT
/**
 *
 * @body Coupon Obj
 * @description Edit a Coupon
 * */
// api/coupon/edit/:id
router.put('/edit/:id', CouponController.editCoupon)

// DELETE
/**
 * @param Id Coupon
 * @description Removes a Coupon by its id
 * */
// api/coupon/:id
router.delete('/:id', CouponController.removeCoupon)

// Export the Router
module.exports = router
