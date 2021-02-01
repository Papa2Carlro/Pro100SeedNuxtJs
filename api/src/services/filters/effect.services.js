// eslint-disable
// Model
const Effect = require('../../models/filters/effect.model')

// Getters
exports.getEffectById = async function (id, callback) {
  await Effect.findById(id, callback)
}
exports.getEffectByFilterId = async function (filterId, callback) {
  await Effect.findOne({filterId}, callback)
}

// Create Effect Filters
exports.createEffect = async function (effect) {
  const newEffect = new Effect({
    name: {
      ru: effect.name.ru,
      en: effect.name.en
    },
    svg: effect.svg,
    filterId: effect.filterId
  })

  try {
    return await newEffect.save()
  } catch (err) {
    throw err
  }
}

// Get All Effect Filters
exports.getEffects = async function () {
  try {
    const _detail = await Effect.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit Effect Filters
exports.editEffects = async function (id, newEffect) {
  try {
    const _detail = await Effect.findOne({_id: id})
    if (!_detail) { throw 'Effect not found' }

    await Effect.findOneAndUpdate({_id: id}, newEffect, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.deleteEffect = async function (id) {
  // Delete the Effect Filters
  try {
    const deleted = await Effect.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete Effect' }

    return deleted
  } catch (err) {
    throw err
  }
}
