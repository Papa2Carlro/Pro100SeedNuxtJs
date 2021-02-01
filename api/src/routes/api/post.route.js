// eslint-disable
const express = require('express')
const router = express.Router()
const passport = require('passport')

// Controller
const PostController = require('../../controller/post.controller')

// GET
/**
 *
 * @description Get all post
 * */
// api/post/all
router.get('/all', PostController.getPost)

/**
 *
 * @param Id Product
 * @description Get post by id
 * */
// api/post/all/:id
router.get('/all/:id', passport.authenticate('jwt', {session: false}), PostController.getPostById)

// POST
/**
 *
 * @body Post Obj
 * @description Creates a new post
 * */
// api/post/create
router.post('/create', passport.authenticate('jwt', {session: false}), PostController.createPost)

// PUT
/**
 *
 * @body Post Obj
 * @description Edit a post
 * */
// api/post/edit
router.put('/edit/:id', passport.authenticate('jwt', {session: false}), PostController.editPost)

// DELETE
/**
 * @param Id post
 * @description Removes a post by its id
 * */
// api/post/:id
router.delete('/:id', passport.authenticate('jwt', {session: false}), PostController.removePost)

// Export the Router
module.exports = router
