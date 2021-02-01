// eslint-disable
const express = require('express')
const router = express.Router()

const genetics = require('./filters/genetic.router')
const taste = require('./filters/taste.router')
const effect = require('./filters/effect.router')
const variety = require('./filters/variety.router')

router.use('/genetics', genetics)
router.use('/tastes', taste)
router.use('/effects', effect)
router.use('/variety', variety)

// Export the Router
module.exports = router

// api/filters/genetics
// api/filters/tastes
// api/filters/effects
// api/filters/variety
