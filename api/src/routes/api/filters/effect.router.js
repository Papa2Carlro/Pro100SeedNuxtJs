// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const EffectController = require('../../../controller/filters/effect.controller')

// GET
/**
 *
 * @description Get Effect
 * */
// api/filters/effect
router.get('/', EffectController.getEffect)

// POST
/**
 *
 * @body Effect Obj
 * @description Creates a new Effect
 * */
// api/filters/effect/
router.post('/', passport.authenticate('jwt', {session: false}), EffectController.createEffect)

// PUT
/**
 *
 * @param Id Effect
 * @body Effect Obj
 * @description Edit a Effect by its id
 * */
// api/filters/effect/:id
router.put('/:id', passport.authenticate('jwt', {session: false}), EffectController.editEffect)

// DELETE
/**
 * @param Id Effect
 * @description Removes a Effect by its id
 * */
// api/filters/effect/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), EffectController.deleteEffect)

// Export the Router
module.exports = router
