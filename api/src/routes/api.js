const express = require('express')
const router = express.Router()

const post = require('./api/post.route')
const user = require('./api/user.route')
const coupon = require('./api/coupon.route')
const products = require('./api/products.route')
const image = require('./api/image.router')
const store = require('./api/store.router')
const faq = require('./api/faq.router')
const filter = require('./api/filters.router')
const pages = require('./api/page.router')
const mailer = require('./api/mailer.router')
const shipping = require('./api/shipping.router')
const payment = require('./api/payment.router')

// Routes
router.use('/products', products)
router.use('/users', user)
router.use('/post', post)
router.use('/coupon', coupon)
router.use('/store', store)
router.use('/faq', faq)
router.use('/image', image)
router.use('/filters', filter)
router.use('/pages', pages)
router.use('/mailer', mailer)
router.use('/shipping', shipping)
router.use('/payment', payment)

module.exports = router

// api/products
// api/user
// api/post
// api/coupon
// api/image
// api/store
// api/faq
// api/filters
// api/pages
// api/mailer
// api/shipping
// api/payment
