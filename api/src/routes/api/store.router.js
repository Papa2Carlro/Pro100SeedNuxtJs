// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const StoreController = require('../../controller/store.controller')

// GET
/**
 *
 * @description Get Stores
 * */
// api/store
router.get('/', StoreController.getStores)

// POST
/**
 *
 * @body Stores Obj
 * @description Creates a new Store
 * */
// api/store/create
router.post('/create', passport.authenticate('jwt', {session: false}), StoreController.createStore)

// PUT
/**
 *
 * @param Id Stores
 * @body Stores Obj
 * @description Edit a Stores by its id
 * */
// api/store/edit/:id
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), StoreController.editStore)

// DELETE
/**
 * @param Id Stores
 * @description Removes a Stores by its id
 * */
// api/store/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), StoreController.deleteStore)

// Export the Router
module.exports = router
