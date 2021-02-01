// eslint-disable
// Services
const PageService = require('../services/page.services')

// Get All Page
exports.getPage = async function (req, res) {
  const page = req.params.page

  try {
    let Page = await PageService.getPage(page)

    if (Page.length === 0) {
      await PageService.createPage(page)

      Page = await PageService.getPage(page)
    }

    return res.status(200).json({ok: true, body: Page})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Page Edit Controller
exports.editPage = async function (req, res) {
  const page = req.params.page

  let errField = {}

  const newPage = {
    html: {
      ru: req.body.html.ru,
      en: req.body.html.en
    }
  }

  try {
    if (!newPage.html.ru) { errField.htmlRu = 'Поле обезательно для заполнения' }
    if (!newPage.html.en) { errField.htmlEn = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    await PageService.editPage(page, newPage)
    return res.status(201).json({ok: true, msg: `${page} успешно изменен`})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}
