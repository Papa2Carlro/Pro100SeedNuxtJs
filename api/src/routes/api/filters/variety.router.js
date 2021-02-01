// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const VarietyController = require('../../../controller/filters/variety.controller')

// GET
/**
 *
 * @description Get Variety
 * */
// api/filters/variety
router.get('/', VarietyController.getVariety)

// POST
/**
 *
 * @body Variety Obj
 * @description Creates a new Variety
 * */
// api/filters/variety/
router.post('/', VarietyController.createVariety)

// PUT
/**
 *
 * @param Id Variety
 * @body Variety Obj
 * @description Edit a Variety by its id
 * */
// api/filters/variety/:id
router.put('/:id', passport.authenticate('jwt', {session: false}), VarietyController.editVariety)

// DELETE
/**
 * @param Id Variety
 * @description Removes a Variety by its id
 * */
// api/filters/variety/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), VarietyController.deleteVariety)

// Export the Router
module.exports = router
