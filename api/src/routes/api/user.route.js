// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const UserController = require('../../controller/user.controller')

// GET
/**
 *
 * @description Get user
 * */
// api/users
router.post('/', passport.authenticate('jwt', {session: false}), UserController.getUser)

/**
 *
 * @description Get all users
 * */
// api/users/all
router.get('/all', passport.authenticate('jwt', {session: false}), UserController.getUsers)

/**
 *
 * @param Id user
 * @description Get user by id
 * */
// api/users/all/:id
router.get('/all/:id', passport.authenticate('jwt', {session: false}), UserController.getUserById)

/**
 *
 * @param Referral code user
 * @description Get user by Referral code
 * */
// api/users/referral/:id
router.get('/referral/:referral', passport.authenticate('jwt', {session: false}), UserController.getUserByReferral)

// POST
/**
 *
 * @body User Obj
 * @description Creates a new user
 * */
// api/users/create
router.post('/create', UserController.createUser)

/**
 *
 * @body {
 *   email, password
 * }
 * @description Login
 * */
// api/users/login
router.post('/login', UserController.login)

// PUT
/**
 *
 * @param Id User
 * @body User Obj
 * @description Edit a User by its id
 * */
// api/users/edit/:id
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), UserController.editUser)

/**
 *
 * @param Id User
 * @body User Obj
 * @description Edit a User by its id
 * */
// api/users/password/:id
router.put('/password/:id', UserController.changePassword)

/**
 *
 * @body {
 *   email
 * }
 * @description Confirm Email
 * */
// api/users/confirm
router.put('/confirm', UserController.confirmMail)

/**
 *
 * @body {
 *   email
 * }
 * @description Reset password
 * */
// api/users/password
router.put('/password', UserController.sendPassword)

// DELETE
/**
 * @param Id user
 * @description Removes a user by its id
 * */
// api/users/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), UserController.removeUser)

// Export the Router
module.exports = router
