// eslint-disable
// Services
const MailerService = require('../services/mailer.services')

exports.addEmail = async function (req, res) {
  const email = req.body.email

  try {
    const mailer = await MailerService.addEmail(email)

    if (mailer === 'Already exists') {
      return res.status(201).json({ok: false, msg: 'Email уже добавлен!'})
    } else {
      return res.status(201).json({ok: true, msg: 'Email успешно добавлен!'})
    }
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

exports.sendMail = async function (req, res) {
  const mail = {
    mail: req.body.mail,
    subject: req.body.subject
  }

  try {
    await MailerService.sendMail(mail)
    return res.status(201).json({ok: true, msg: 'Письмо отправленно!'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

exports.unsubscribe = async function (req, res) {
  const email = req.params.email

  try {
    await MailerService.unsubscribe(email)
    return res.status(201).json({ok: true, msg: 'Email отписан от рассылки!'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}
