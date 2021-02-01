// eslint-disable
// Services
const VarietyService = require('../../services/filters/variety.services')

// Variety Create Controller
exports.createVariety = async function (req, res) {
  let errField = {}

  const variety = {
    name: {
      ru: req.body.name.ru,
      en: req.body.name.en
    },
    filterId: req.body.filterId
  }

  try {
    await VarietyService.getVarietyByFilterId(variety.filterId, (err, filter) => {
      if (filter) { errField.filterId = 'Такой id уже существует' }
    })
    if (!variety.name.ru) { errField.nameRu = 'Поле обезательно для заполнения' }
    if (!variety.name.en) { errField.nameEn = 'Поле обезательно для заполнения' }
    if (!variety.filterId) { errField.filterId = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    const Variety = await VarietyService.createVariety(variety)
    return res.status(201).json({ok: true, msg: 'Тип сорта успешно добавлен', body: Variety})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get All Variety
exports.getVariety = async function (req, res) {
  try {
    const Variety = await VarietyService.getVariety()
    if (Variety.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: Variety})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Variety Edit Controller
exports.editVariety = async function (req, res) {
  const id = req.params.id

  let errField = {}

  const variety = {
    name: {
      ru: req.body.name.ru,
      en: req.body.name.en
    },
    filterId: req.body.filterId
  }

  try {
    await VarietyService.getVarietyByFilterId(variety.filterId, (err, filter) => {
      if (filter) {
        if (filter._id.toString() !== id) { throw 'Такой id уже существует' }
      }
    })
    if (!variety.name.ru) { errField.nameRu = 'Поле обезательно для заполнения' }
    if (!variety.name.en) { errField.nameEn = 'Поле обезательно для заполнения' }
    if (!variety.filterId) { errField.filterId = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    await VarietyService.editVariety(id, variety)
    return res.status(201).json({ok: true, msg: 'Тип сорта успешно изменен'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Delete Variety Controller
exports.deleteVariety = async function (req, res) {
  const id = req.params.id

  try {
    await VarietyService.deleteVariety(id)
    return res.status(200).json({ok: true, msg: 'Тип сорта уничтожен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
