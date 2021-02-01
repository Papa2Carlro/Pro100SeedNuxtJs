// eslint-disable
// Model
const Taste = require('../../models/filters/taste.model')

// Getters
exports.getTasteById = async function (id, callback) {
  await Taste.findById(id, callback)
}
exports.getTasteByFilterId = async function (filterId, callback) {
  await Taste.findOne({filterId}, callback)
}

// Create Taste Filters
exports.createTaste = async function (taste) {
  const newTaste = new Taste({
    name: {
      ru: taste.name.ru,
      en: taste.name.en
    },
    svg: taste.svg,
    filterId: taste.filterId
  })

  try {
    return await newTaste.save()
  } catch (err) {
    throw err
  }
}

// Get All Taste Filters
exports.getTastes = async function () {
  try {
    const _detail = await Taste.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit Taste Filters
exports.editTaste = async function (id, newTaste) {
  try {
    const _detail = await Taste.findOne({_id: id})
    if (!_detail) { throw 'Taste not found' }

    await Taste.findOneAndUpdate({_id: id}, newTaste, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.deleteTaste = async function (id) {
  // Delete the Taste Filters
  try {
    const deleted = await Taste.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete Taste' }

    return deleted
  } catch (err) {
    throw err
  }
}
