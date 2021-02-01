// eslint-disable
// Model
const Genetic = require('../../models/filters/genetic.model')

// Getters
exports.getGeneticById = async function (id, callback) {
  await Genetic.findById(id, callback)
}
exports.getGeneticByFilterId = async function (filterId, callback) {
  await Genetic.findOne({filterId}, callback)
}

// Create Genetic Filters
exports.createGenetic = async function (genetic) {
  const newGenetic = new Genetic({
    name: {
      ru: genetic.name.ru,
      en: genetic.name.en
    },
    filterId: genetic.filterId
  })

  try {
    return await newGenetic.save()
  } catch (err) {
    throw err
  }
}

// Get All Genetics Filters
exports.getGenetics = async function () {
  try {
    const _detail = await Genetic.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit Genetic Filters
exports.editGenetic = async function (id, newGenetic) {
  try {
    const _detail = await Genetic.findOne({_id: id})
    if (!_detail) { throw 'Genetic not found' }

    await Genetic.findOneAndUpdate({_id: id}, newGenetic, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.deleteGenetic = async function (id) {
  // Delete the Genetic Filters
  try {
    const deleted = await Genetic.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete Genetic' }

    return deleted
  } catch (err) {
    throw err
  }
}
