// eslint-disable
// Model
const FAQ = require('../models/faq.model')

// Getters
exports.getFAQById = async function (id, callback) {
  await FAQ.findById(id, callback)
}

// Create FAQ
exports.createFAQ = async function (store) {
  const newFAQ = new FAQ({
    title: {
      ru: store.title.ru,
      en: store.title.en
    },
    text: {
      ru: store.text.ru,
      en: store.text.en
    }
  })

  try {
    return await newFAQ.save()
  } catch (err) {
    throw err
  }
}

// Get All FAQs
exports.getFAQs = async function () {
  try {
    const _detail = await FAQ.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit FAQ
exports.editFAQ = async function (id, newFAQ) {
  try {
    const _detail = await FAQ.findOne({_id: id})
    if (!_detail) { throw 'FAQ not found' }

    await FAQ.findOneAndUpdate({_id: id}, newFAQ, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.deleteFAQ = async function (id) {
  // Delete the FAQ
  try {
    const deleted = await FAQ.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete FAQ' }

    return deleted
  } catch (err) {
    throw err
  }
}
