// eslint-disable
// Services
const EffectService = require('../../services/filters/effect.services')

// Taste Create Controller
exports.createEffect = async function (req, res) {
  let errField = {}

  const effect = {
    name: {
      ru: req.body.name.ru,
      en: req.body.name.en
    },
    svg: req.body.svg,
    filterId: req.body.filterId
  }

  try {
    await EffectService.getEffectByFilterId(effect.filterId, (err, filter) => {
      if (filter) { errField.filterId = 'Такой id уже существует' }
    })
    if (!effect.name.ru) { errField.nameRu = 'Поле обезательно для заполнения' }
    if (!effect.name.en) { errField.nameEn = 'Поле обезательно для заполнения' }
    if (!effect.svg) { errField.svg = 'Поле обезательно для заполнения' }
    if (!effect.filterId) { errField.filterId = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    const Effect = await EffectService.createEffect(effect)
    return res.status(201).json({ok: true, msg: 'Фильтр ефектов успешно добавлен', body: Effect})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get All Effect
exports.getEffect = async function (req, res) {
  try {
    const Effect = await EffectService.getEffects()
    if (Effect.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: Effect})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Effect Edit Controller
exports.editEffect = async function (req, res) {
  const id = req.params.id

  let errField = {}

  const effect = {
    name: {
      ru: req.body.name.ru,
      en: req.body.name.en
    },
    svg: req.body.svg,
    filterId: req.body.filterId
  }

  try {
    await EffectService.getEffectByFilterId(effect.filterId, (err, filter) => {
      if (filter) {
        if (filter._id.toString() !== id) { throw 'Такой id уже существует' }
      }
    })
    if (!effect.name.ru) { errField.nameRu = 'Поле обезательно для заполнения' }
    if (!effect.name.en) { errField.nameEn = 'Поле обезательно для заполнения' }
    if (!effect.svg) { errField.svg = 'Поле обезательно для заполнения' }
    if (!effect.filterId) { errField.filterId = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    await EffectService.editEffects(id, effect)
    return res.status(201).json({ok: true, msg: 'Фильтр ефекта успешно изменен'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Delete Effect Controller
exports.deleteEffect = async function (req, res) {
  const id = req.params.id

  try {
    await EffectService.deleteEffect(id)
    return res.status(200).json({ok: true, msg: 'Фильтр ефектов уничтожен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
