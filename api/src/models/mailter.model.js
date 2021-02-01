const mongoose = require('mongoose')

const MailerSchema = new mongoose.Schema({
  email: String
})

const Mailer = mongoose.model('Mailer', MailerSchema)

module.exports = Mailer
