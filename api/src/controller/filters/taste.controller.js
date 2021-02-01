// eslint-disable
// Services
const TasteService = require('../../services/filters/taste.services')

// Taste Create Controller
exports.createTaste = async function (req, res) {
  let errField = {}

  const taste = {
    name: {
      ru: req.body.name.ru,
      en: req.body.name.en
    },
    svg: req.body.svg,
    filterId: req.body.filterId
  }

  try {
    await TasteService.getTasteByFilterId(taste.filterId, (err, filter) => {
      if (filter) { errField.filterId = 'Такой id уже существует' }
    })
    if (!taste.name.ru) { errField.nameRu = 'Поле обезательно для заполнения' }
    if (!taste.name.en) { errField.nameEn = 'Поле обезательно для заполнения' }
    if (!taste.svg) { errField.svg = 'Поле обезательно для заполнения' }
    if (!taste.filterId) { errField.filterId = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    const Taste = await TasteService.createTaste(taste)
    return res.status(201).json({ok: true, msg: 'Фильтр вкуса успешно добавлен', body: Taste})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get All Taste
exports.getTastes = async function (req, res) {
  try {
    const Taste = await TasteService.getTastes()
    if (Taste.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: Taste})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Taste Edit Controller
exports.editTaste = async function (req, res) {
  const id = req.params.id

  let errField = {}

  const taste = {
    name: {
      ru: req.body.name.ru,
      en: req.body.name.en
    },
    svg: req.body.svg,
    filterId: req.body.filterId
  }

  try {
    await TasteService.getTasteByFilterId(taste.filterId, (err, filter) => {
      if (filter) {
        if (filter._id.toString() !== id) { throw 'Такой id уже существует' }
      }
    })
    if (!taste.name.ru) { errField.nameRu = 'Поле обезательно для заполнения' }
    if (!taste.name.en) { errField.nameEn = 'Поле обезательно для заполнения' }
    if (!taste.svg) { errField.svg = 'Поле обезательно для заполнения' }
    if (!taste.filterId) { errField.filterId = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    await TasteService.editTaste(id, taste)
    return res.status(201).json({ok: true, msg: 'Фильтр вкуса успешно изменен'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Delete Taste Controller
exports.deleteTaste = async function (req, res) {
  const id = req.params.id

  try {
    await TasteService.deleteTaste(id)
    return res.status(200).json({ok: true, msg: 'Фильтр вкуса уничтожен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
