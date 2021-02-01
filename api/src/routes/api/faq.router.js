// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const FAQController = require('../../controller/faq.controller')

// GET
/**
 *
 * @description Get FAQ
 * */
// api/faq
router.get('/', FAQController.getFAQs)

// POST
/**
 *
 * @body FAQ Obj
 * @description Creates a new FAQ
 * */
// api/faq/create
router.post('/create', passport.authenticate('jwt', {session: false}), FAQController.createFAQ)

// PUT
/**
 *
 * @param Id FAQ
 * @body FAQ Obj
 * @description Edit a FAQ by its id
 * */
// api/faq/edit/:id
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), FAQController.editFAQ)

// DELETE
/**
 * @param Id FAQ
 * @description Removes a FAQ by its id
 * */
// api/faq/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), FAQController.deleteFAQ)

// Export the Router
module.exports = router
