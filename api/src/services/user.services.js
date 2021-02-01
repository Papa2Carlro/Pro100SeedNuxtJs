// eslint-disable
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

// Model
const User = require('../models/user.model')

// Mailer
const mailer = require('../utils/nodemail')

// Getters
exports.getUserById = async function (id, callback) {
  await User.findById(id, callback)
}
exports.getUserByEmail = async function (email, callback) {
  await User.findOne({email}, callback)
}
exports.getUserByReferral = async function (referralCode, callback) {
  await User.findOne({referralCode}, callback)
}

// Create User
exports.createUser = async function (user) {
  // Hash password
  const hashedPassword = bcrypt.hashSync(user.password, 8)

  // Create referral code
  const referralCode = await crypto.randomBytes(14).toString('hex')

  // Create checks email hash
  const hash = await crypto.randomBytes(16).toString('hex')

  const newUser = new User({
    email: user.email,
    password: hashedPassword,
    nickname: user.nickname,
    phone: user.phone,
    city: user.city,
    refer: user.refer,
    referralCode,
    check: {
      email: {hash}
    }
  })

  const link = `http://localhost:3000/referral/sign-in?hash=${hash}`

  const messages = {
    to: user.email,
    subject: 'Подтверждение email',
    html: `<h1>Подтверждение email</h1>
      <h3>Перейдите по ссылке что бы подтвердить email</h3>
      <a target="_blank" href="${link}">${link}</a>

      <p>Данное письмо не требует ответа.</p>`
  }
  mailer(messages)

  try {
    await newUser.save()
  } catch (err) {
    throw err
  }
}

// Login
exports.loginUser = async function (userData) {
  let errField = {}

  try {
    const user = await User.findOne({email: userData.email})
    if (!user) { errField.email = 'Пользователь не найден' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    const passwordIsValid = bcrypt.compareSync(userData.password, user.password)
    if (!passwordIsValid) { errField.password = 'Пароль неверный' }

    if (!user.check.email.status) { errField.status = 'Пользователь не потвержден' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    const token = jwt.sign({
      email: user.email,
      userId: user._id
    }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24 * 7})

    return {
      token: `Bearer ${token}`,
      isAdmin: user.isAdmin
    }
  } catch (err) {
    throw err
  }
}

// Confirm Mail
exports.confirmMail = async function (email) {
  // Create checks email hash
  const hash = await crypto.randomBytes(16).toString('hex')
  const link = `http://localhost:3000/referral/sign-in?hash=${hash}`

  const confirm = {
    check: {
      email: {hash}
    }
  }

  try {
    const user = await User.findOne({email})
    if (!user) { throw 'Пользователя не найденно' }

    const messages = {
      to: email,
      subject: 'Подтверждение email',
      html: `<h1>Подтверждение email</h1>
      <h3>Перейдите по ссылке что бы подтвердить email</h3>
      <a target="_blank" href="${link}">${link}</a>

      <p>Данное письмо не требует ответа.</p>`
    }
    mailer(messages)

    await User.findOneAndUpdate({_id: user._id}, confirm, {returnOriginal: false})
  } catch (err) {
    throw err
  }
}

// Get User
exports.getUser = async function (email) {
  try {
    const user = await User.findOne({email})
    if (!user) { throw 'Пользователя не найденно' }

    return user
  } catch (err) {
    throw err
  }
}

// Get All Users
exports.getUsers = async function () {
  try {
    const _detail = await User.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit user
exports.editUser = async function (id, newUser) {
  try {
    const _detail = await User.findOne({_id: id})
    if (!_detail) { throw 'User not found' }

    await User.findOneAndUpdate({_id: id}, newUser, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.sendPassword = async function (email) {
  // Create checks email hash
  const password = await crypto.randomBytes(4).toString('hex')

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 8)

  try {
    // Find the User
    const _details = await User.findOne({email})
    if (!_details) { throw 'Пользователя не существует' }

    const messages = {
      to: email,
      subject: 'Смена пароля',
      html: `<h3>Вы сделали запрос на смену пароля</h3>
      <h5>Ваш новый пароль: <b>${password}</b></h5>

      <p>Пароль можно изменить в личном кабинете.</p>
      <p>Данное письмо не требует ответа.</p>`
    }
    mailer(messages)

    await User.findOneAndUpdate({email}, {password: hashedPassword}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Confirm user
exports.confirmUser = async function (email, hash) {
  const confirm = {
    check: {
      email: {status: true, hash: ''}
    }
  }

  try {
    const _detail = await User.findOne({email})
    if (!_detail) { throw 'User not found' }

    if (_detail.check.email.status) { return }

    if (_detail.check.email.hash === hash) {
      await User.findOneAndUpdate({_id: _detail.id}, confirm, {returnOriginal: false})
    } else {
      throw 'Ссылка устарела или не действительна'
    }
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Change password
exports.changePassword = async function (id, password) {
  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 8)

  try {
    const _detail = await User.findOne({_id: id})
    if (!_detail) { throw 'User not found' }

    const passwordIsValid = bcrypt.compareSync(password, _detail.password)
    if (passwordIsValid) { throw 'Новый пароль не должен совпадать с старым' }

    await User.findOneAndUpdate({_id: id}, {password: hashedPassword, modify: ''}, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.removeUser = async function (id) {
  // Delete the Post
  try {
    const deleted = await User.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete user' }

    return deleted
  } catch (err) {
    throw err
  }
}
