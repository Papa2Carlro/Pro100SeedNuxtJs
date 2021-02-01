// eslint-disable
// Services
const StoreService = require('../services/store.services')

// Store Create Controller
exports.createStore = async function (req, res) {
  let errField = {}

  const Store = {
    title: req.body.title,
    country: req.body.country,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng
  }

  try {
    if (!Store.title) { errField.title = 'Поле обезательно для заполнения' }
    if (!Store.country) { errField.country = 'Поле обезательно для заполнения' }
    if (!Store.address) { errField.address = 'Поле обезательно для заполнения' }
    if (!Store.lat) { errField.lat = 'Поле обезательно для заполнения' }
    if (!Store.lng) { errField.lng = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    const store = await StoreService.createStore(Store)
    return res.status(201).json({ok: true, msg: 'Магазин успешно добавлен', body: store})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get All Stores
exports.getStores = async function (req, res) {
  try {
    const stores = await StoreService.getStores()
    if (stores.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: stores})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Store Edit Controller
exports.editStore = async function (req, res) {
  const id = req.params.id

  let errField = {}

  const Store = {
    title: req.body.title,
    country: req.body.country,
    address: req.body.address,
    lat: req.body.lat,
    lng: req.body.lng
  }

  try {
    if (!Store.title) { errField.title = 'Поле обезательно для заполнения' }
    if (!Store.country) { errField.country = 'Поле обезательно для заполнения' }
    if (!Store.address) { errField.address = 'Поле обезательно для заполнения' }
    if (!Store.lat) { errField.lat = 'Поле обезательно для заполнения' }
    if (!Store.lng) { errField.lng = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    await StoreService.editStores(id, Store)
    return res.status(201).json({ok: true, msg: 'Магазин успешно изменен'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Delete Store Controller
exports.deleteStore = async function (req, res) {
  const id = req.params.id

  try {
    await StoreService.deleteStore(id)
    return res.status(200).json({ok: true, msg: 'Магазин уничтожен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
