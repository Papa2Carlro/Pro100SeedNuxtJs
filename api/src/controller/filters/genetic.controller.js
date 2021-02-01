// eslint-disable
// Services
const GeneticService = require('../../services/filters/genetic.services')

// Genetic Create Controller
exports.createGenetic = async function (req, res) {
  let errField = {}

  const genetic = {
    name: {
      ru: req.body.name.ru,
      en: req.body.name.en
    },
    filterId: req.body.filterId
  }

  try {
    await GeneticService.getGeneticByFilterId(genetic.filterId, (err, filter) => {
      if (filter) { errField.filterId = 'Такой id уже существует' }
    })
    if (!genetic.name.ru) { errField.nameRu = 'Поле обезательно для заполнения' }
    if (!genetic.name.en) { errField.nameEn = 'Поле обезательно для заполнения' }
    if (!genetic.filterId) { errField.filterId = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    const Genetic = await GeneticService.createGenetic(genetic)
    return res.status(201).json({ok: true, msg: 'Фильтр генетики успешно добавлен', body: Genetic})
  } catch (err) {
    console.log(err)
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Get All Genetic
exports.getGenetics = async function (req, res) {
  try {
    const Genetic = await GeneticService.getGenetics()
    if (Genetic.length === 0) { throw 'Empty' }

    return res.status(200).json({ok: true, body: Genetic})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}

// Genetic Edit Controller
exports.editGenetic = async function (req, res) {
  const id = req.params.id

  let errField = {}

  const genetic = {
    name: {
      ru: req.body.name.ru,
      en: req.body.name.en
    },
    filterId: req.body.filterId
  }

  try {
    await GeneticService.getGeneticByFilterId(genetic.filterId, (err, filter) => {
      if (filter) {
        if (filter._id.toString() !== id) { throw 'Такой id уже существует' }
      }
    })
    if (!genetic.name.ru) { errField.nameRu = 'Поле обезательно для заполнения' }
    if (!genetic.name.en) { errField.nameEn = 'Поле обезательно для заполнения' }
    if (!genetic.filterId) { errField.filterId = 'Поле обезательно для заполнения' }

    // Throw out the error
    if (Object.keys(errField).length) { throw errField }

    await GeneticService.editGenetic(id, genetic)
    return res.status(201).json({ok: true, msg: 'Фильтр генетики успешно изменен'})
  } catch (err) {
    // Return an Error Response Message with Code and the Error Message.
    return res.json({ok: false, msg: err})
  }
}

// Delete Genetic Controller
exports.deleteGenetic = async function (req, res) {
  const id = req.params.id

  try {
    await GeneticService.deleteGenetic(id)
    return res.status(200).json({ok: true, msg: 'Фильтр генетики уничтожен'})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
