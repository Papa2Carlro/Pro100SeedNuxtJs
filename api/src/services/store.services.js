// eslint-disable
// Model
const Store = require('../models/store.model')

// Getters
exports.getStoreById = async function (id, callback) {
  await Store.findById(id, callback)
}

// Create Store
exports.createStore = async function (store) {
  const newStore = new Store({
    title: store.title,
    country: store.country,
    address: store.address,
    lat: store.lat,
    lng: store.lng
  })

  try {
    return await newStore.save()
  } catch (err) {
    throw err
  }
}

// Get All Store
exports.getStores = async function () {
  try {
    const _detail = await Store.find({})

    return _detail
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

// Edit Store
exports.editStores = async function (id, newStores) {
  try {
    const _detail = await Store.findOne({_id: id})
    if (!_detail) { throw 'User not found' }

    await Store.findOneAndUpdate({_id: id}, newStores, {returnOriginal: false})
  } catch (err) {
    // return a Error message describing the reason
    throw err
  }
}

exports.deleteStore = async function (id) {
  // Delete the Store
  try {
    const deleted = await Store.deleteOne({_id: id})
    if (deleted.n === 0 && deleted.ok === 1) { throw 'Failed to delete user' }

    return deleted
  } catch (err) {
    throw err
  }
}
