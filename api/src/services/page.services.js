// eslint-disable
// Model
const Page = require('../models/page.model')

// Create Page
exports.createPage = async function (page) {
  const newPage = new Page({
    name: page,
    html: {
      ru: `<p>Страница <b>${page}</b>></p>`,
      en: `<p>Page <b>${page}</b>></p>`
    }
  })

  try {
    return await newPage.save()
  } catch (err) {
    throw err
  }
}

// Get Page
exports.getPage = async function (page) {
  try {
    let _detail = await Page.find({name: page})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit Page
exports.editPage = async function (page, newPage) {
  try {
    const _detail = await Page.findOne({name: page})
    if (!_detail) { throw 'Page not found' }

    await Page.findOneAndUpdate({name: page}, newPage, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}
