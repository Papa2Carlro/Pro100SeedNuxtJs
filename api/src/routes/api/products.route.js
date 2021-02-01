// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const ProductController = require('../../controller/product.controller')

// GET
/**
 *
 * @description Get all products
 * */
// api/products/visible
router.get('/visible', ProductController.getAllProducts)

/**
 *
 * @description Get all products
 * */
// api/products/all
router.get('/all', ProductController.getAdminProducts)

/**
 *
 * @description Get all products
 * */
// api/products/comments/:id
router.get('/comments/:id', ProductController.getComments)

/**
 *
 * @param Id Product
 * @description Get product
 * */
// api/products/all/id
router.get('/all/:id', passport.authenticate('jwt', {session: false}), ProductController.getProductById)

// POST
/**
 *
 * @body Product Obj
 * @description Creates a new product
 * */
// api/products/create
router.post('/create', passport.authenticate('jwt', {session: false}), ProductController.createProduct)

/**
 *
 * @body comments Obj
 * @description Creates a new comments
 * */
// api/products/comments/create/:id
router.post('/comments/create/:id', ProductController.addComments)

/**
 *
 * @body comments Obj
 * @description Creates a new comments
 * */
// api/products/comments/edit/:id
router.post('/comments/edit/:id', ProductController.editComments)

/**
 *
 * @body comments Obj
 * @description delete comments
 * */
// api/products/comments/delete/:id
router.post('/comments/delete/:id', ProductController.deleteComments)

// PUT
/**
 *
 * @param Id Product
 * @body Product Obj
 * @description Edit a product by its id
 * */
// api/products/:id
router.put('/:id', passport.authenticate('jwt', {session: false}), ProductController.editProduct)

// PATCH
/**
 *
 * @param Id Product
 * @body Visible
 * @description Edit a product by its id
 * */
// api/products/:id
router.patch('/:id', passport.authenticate('jwt', {session: false}), ProductController.EnableDisableProduct)

// DELETE
/**
 * @param Id Product
 * @description Removes a product by its id
 * */
// api/products/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), ProductController.removeProduct)

// Export the Router
module.exports = router
