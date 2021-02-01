// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const TasteController = require('../../../controller/filters/taste.controller')

// GET
/**
 *
 * @description Get Taste
 * */
// api/filters/taste
router.get('/', TasteController.getTastes)

// POST
/**
 *
 * @body Taste Obj
 * @description Creates a new Taste
 * */
// api/filters/taste/
router.post('/', passport.authenticate('jwt', {session: false}), TasteController.createTaste)

// PUT
/**
 *
 * @param Id Taste
 * @body Taste Obj
 * @description Edit a Taste by its id
 * */
// api/filters/taste/:id
router.put('/:id', passport.authenticate('jwt', {session: false}), TasteController.editTaste)

// DELETE
/**
 * @param Id Taste
 * @description Removes a Taste by its id
 * */
// api/filters/taste/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), TasteController.deleteTaste)

// Export the Router
module.exports = router
