// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const GeneticController = require('../../../controller/filters/genetic.controller')

// GET
/**
 *
 * @description Get Genetic
 * */
// api/filters/genetics
router.get('/', GeneticController.getGenetics)

// POST
/**
 *
 * @body Genetic Obj
 * @description Creates a new Genetic
 * */
// api/filters/genetics/
router.post('/', passport.authenticate('jwt', {session: false}), GeneticController.createGenetic)

// PUT
/**
 *
 * @param Id Genetic
 * @body Genetic Obj
 * @description Edit a Genetic by its id
 * */
// api/filters/genetics/:id
router.put('/:id', passport.authenticate('jwt', {session: false}), GeneticController.editGenetic)

// DELETE
/**
 * @param Id FAQ
 * @description Removes a FAQ by its id
 * */
// api/filters/genetics/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), GeneticController.deleteGenetic)

// Export the Router
module.exports = router
