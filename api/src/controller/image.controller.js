exports.uploadPhoto = function (req, res) {
  try {
    res.json({ok: true, image: `/${req.file.path.split('\\').join('/')}`})
  } catch (err) {
    return res.json({ok: false, msg: err})
  }
}
