// eslint-disable
const express = require('express')
const router = express.Router()

// Controller
const ImageController = require('../../controller/image.controller')
const upload = require('../../middleware/upload')

// POST
/**
 *
 * @description Upload image
 * */
// api/image
router.post('/', upload.single('image'), ImageController.uploadPhoto)

// Export the Router
module.exports = router
