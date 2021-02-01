// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const PageController = require('../../controller/page.controller')

// GET
/**
 *
 * @param Name Page
 * @description Get Page
 * */
// api/pages/:page
router.get('/:page', PageController.getPage)

// PUT
/**
 *
 * @param Name Page
 * @body Page Obj
 * @description Edit a Page by name
 * */
// api/pages/:page
router.put('/:page', passport.authenticate('jwt', {session: false}), PageController.editPage)

// Export the Router
module.exports = router
