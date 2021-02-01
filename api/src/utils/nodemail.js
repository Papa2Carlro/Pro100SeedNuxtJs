const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // smtp.ethereal.email
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'pro100.tester.me@gmail.com', // nikki.jenkins8@ethereal.email
    pass: 'Nodemailer' // 2g1bQXN8kunW4cBzjj
  },
  tls: {
    rejectUnauthorized: false
  }
},
{
  from: 'PRO100SEEDS <pro100.tester.me@gmail.com>'
})

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) { return console.log(err) }
  })
}

module.exports = mailer
