// eslint-disable
// Services
const UserService = require('../services/user.services')

// Registration Controller
exports.createUser = async function (req, res) {
  let errField = {}

  const User = {
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
    phone: req.body.phone,
    refer: req.body.refer,
    city: req.body.city
  }

  try {
    // Error Event
    await UserService.getUserByEmail(User.email, (err, user) => {
      if (user) { errField.email = 'Такой email уже зарегистрирован!' }
    })
    if (!User.email) { errField.email = 'Поле обезательно для заполнения' }
    if (!User.nickname) { errField.nickname = 'Поле обезательно для заполнения' }
    if (!User.phone) { errField.phone = 'Поле обезательно для заполнения' }
    if (!User.city) { errField.city = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    await UserService.createUser(User)
    return res.status(201).json({ok: true, msg: 'Пользователь успешно зарегистрирован'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Login
exports.login = async function (req, res) {
  let errField = {}

  const User = {
    email: req.body.email,
    password: req.body.password
  }

  try {
    if (!User.email) { errField.email = 'Поле обезательно для заполнения' }
    if (!User.password) { errField.password = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    if (req.body.hash) {
      await UserService.confirmUser(User.email, req.body.hash)
    }

    const data = await UserService.loginUser(User)
    return res.status(200).json({ok: true, msg: 'Доступ разрешен', token: data.token, isAdmin: data.isAdmin})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Confirm Mail
exports.confirmMail = async function (req, res) {
  try {
    await UserService.confirmMail(req.body.email)
    return res.status(200).json({ok: true, msg: 'Письмо отправленно'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Reset Password
exports.sendPassword = async function (req, res) {
  try {
    await UserService.sendPassword(req.body.email)
    return res.status(200).json({ok: true, msg: 'Письмо отправленно'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get User
exports.getUser = async function (req, res) {
  let errField = {}
  const email = req.body.email

  try {
    if (!email) { errField.email = 'Поле обезательно для заполнения' }
    if (Object.keys(errField).length) { throw errField }

    const user = await UserService.getUser(email)

    return res.json({ok: true, body: user})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Get User By Referral code
exports.getUserByReferral = async function (req, res) {
  const referral = req.params.referral

  try {
    await UserService.getUserByReferral(referral, (err, user) => {
      if (err) { throw err }
      return res.json({ok: true, body: user})
    })
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Get All Users
exports.getUsers = async function (req, res) {
  try {
    const users = await UserService.getUsers()

    if (users.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: users})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Get User By Id
exports.getUserById = async function (req, res) {
  const id = req.params.id

  try {
    await UserService.getUserById(id, (err, user) => {
      return res.status(200).json({ok: true, body: user})
    })
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Edit user
exports.editUser = async function (req, res) {
  const id = req.params.id

  // Req.Body contains the form submit values.
  const User = {
    nickname: req.body.nickname,
    city: req.body.city,
    phone: req.body.phone,
    role: req.body.role,
    bonus: req.body.bonus
  }

  try {
    // Calling the Service function with the new object from the Request Body
    await UserService.editUser(id, User)
    return res.status(201).json({ok: true, msg: 'User successfully edit'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Change password
exports.changePassword = async function (req, res) {
  const id = req.params.id

  try {
    // Calling the Service function with the new object from the Request Body
    await UserService.changePassword(id, req.body.password)
    return res.status(201).json({ok: true, msg: 'Password successfully edit'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Remove User Controller
exports.removeUser = async function (req, res) {
  const id = req.params.id

  try {
    await UserService.removeUser(id)
    return res.status(200).json({ok: true, msg: 'User removed'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
