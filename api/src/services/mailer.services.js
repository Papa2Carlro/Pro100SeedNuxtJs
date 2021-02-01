// eslint-disable
// Model
const Mailer = require('../models/mailter.model')

// Mailer
const mailer = require('../utils/nodemail')

// Config
const {config} = require('../config/config')

// Add email
exports.addEmail = async function (email) {
  const Email = new Mailer({email})

  try {
    const mail = await Mailer.findOne({email})

    if (!mail) {
      const message = {
        to: email,
        subject: 'Подписка на рассылку',
        html: `
        <h3>Вы пописались на рассылку на сайте <a href="${config.link}">${config.link}</a></h3>

        <a style="margin-top: 10px; font-size: 15px" href="${config.link}/mailer/unsubscribe/${email.email}">Отказатся от подписки</a>`
      }
      mailer(message)

      return await Email.save()
    } else {
      return 'Already exists'
    }
  } catch (err) {
    throw err
  }
}

exports.sendMail = async function (mail) {
  try {
    const emails = await Mailer.find({})

    emails.map((email) => {
      const messages = {
        to: email.email,
        subject: mail.subject,
        html: `
        ${mail.mail}

        <a style="margin-top: 10px; font-size: 15px" href="${config.link}/mailer/unsubscribe/${email.email}">Отказатся от подписки</a>
        `
      }
      mailer(messages)
    })
  } catch (err) {
    throw err
  }
}

exports.unsubscribe = async function (email) {
  // Delete the Post
  try {
    const deleted = await Mailer.deleteOne({email})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to unsubscribe email' }

    return deleted
  } catch (err) {
    throw err
  }
}
