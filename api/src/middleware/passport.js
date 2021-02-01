const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Model
const User = require('../models/user.model')

require('dotenv').config()

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId).select('email id')

      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    } catch (err) {
      console.log(err)
    }
  }))
}
