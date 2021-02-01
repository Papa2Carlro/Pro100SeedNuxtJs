// eslint-disable
// Model
const Variety = require('../../models/filters/variety.model')

// Getters
exports.getVarietyById = async function (id, callback) {
  await Variety.findById(id, callback)
}
exports.getVarietyByFilterId = async function (filterId, callback) {
  await Variety.findOne({filterId}, callback)
}

// Create Variety Filters
exports.createVariety = async function (variety) {
  const newVariety = new Variety({
    name: {
      ru: variety.name.ru,
      en: variety.name.en
    },
    filterId: variety.filterId
  })

  try {
    return await newVariety.save()
  } catch (err) {
    throw err
  }
}

// Get All Variety Filters
exports.getVariety = async function () {
  try {
    const _detail = await Variety.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit Variety Filters
exports.editVariety = async function (id, newVariety) {
  try {
    const _detail = await Variety.findOne({_id: id})
    if (!_detail) { throw 'Variety not found' }

    await Variety.findOneAndUpdate({_id: id}, newVariety, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.deleteVariety = async function (id) {
  // Delete the Variety Filters
  try {
    const deleted = await Variety.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete Variety' }

    return deleted
  } catch (err) {
    throw err
  }
}
