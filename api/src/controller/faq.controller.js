// eslint-disable
// Services
const FAQService = require('../services/faq.services')

// Store Create Controller
exports.createFAQ = async function (req, res) {
  let errField = {}

  const faq = {
    title: {
      ru: req.body.title.ru,
      en: req.body.title.en
    },
    text: {
      ru: req.body.text.ru,
      en: req.body.text.en
    }
  }

  try {
    if (!faq.title.ru) { errField.titleRu = 'Поле обезательно для заполнения' }
    if (!faq.title.en) { errField.titleEn = 'Поле обезательно для заполнения' }
    if (!faq.text.ru) { errField.textRu = 'Поле обезательно для заполнения' }
    if (!faq.text.en) { errField.textEn = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    const FAQ = await FAQService.createFAQ(faq)
    return res.status(201).json({ok: true, msg: 'FAQ успешно добавлен', body: FAQ})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get All FAQ
exports.getFAQs = async function (req, res) {
  try {
    const FAQ = await FAQService.getFAQs()
    if (FAQ.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: FAQ})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// FAQ Edit Controller
exports.editFAQ = async function (req, res) {
  const id = req.params.id

  let errField = {}

  const faq = {
    title: {
      ru: req.body.title.ru,
      en: req.body.title.en
    },
    text: {
      ru: req.body.text.ru,
      en: req.body.text.en
    }
  }

  try {
    if (!faq.title.ru) { errField.titleRu = 'Поле обезательно для заполнения' }
    if (!faq.title.en) { errField.titleEn = 'Поле обезательно для заполнения' }
    if (!faq.text.ru) { errField.textRu = 'Поле обезательно для заполнения' }
    if (!faq.text.en) { errField.textEn = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    await FAQService.editFAQ(id, faq)
    return res.status(201).json({ok: true, msg: 'FAQ успешно изменен'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Delete FAQ Controller
exports.deleteFAQ = async function (req, res) {
  const id = req.params.id

  try {
    await FAQService.deleteFAQ(id)
    return res.status(200).json({ok: true, msg: 'FAQ уничтожен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
