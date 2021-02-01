// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const MailerController = require('../../controller/mailer.controller')

// POST
/**
 *
 * @body email
 * @description Add email
 * */
// api/mailer/add
router.post('/add', MailerController.addEmail)

/**
 *
 * @body {
 *   mail, subject
 * }
 * @description Send Email
 * */
// api/mailer/send
router.post('/send', passport.authenticate('jwt', {session: false}), MailerController.sendMail)

// DELETE
/**
 *
 * @body email
 * @description Remove email
 * */
// api/mailer/:email
router.delete('/:email', MailerController.unsubscribe)

// Export the Router
module.exports = router
