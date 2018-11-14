const jwt = require('jwt-simple')
const _ = require('lodash')
const bcrypt = require('bcrypt-nodejs')
const db = require('../models')
const { SIGN_UP_OPEN, TOKEN_SECRET } = process.env

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, TOKEN_SECRET)
}

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(password, salt)
  return passwordHash
}

exports.signin = (req, res) => {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.json({
    token: tokenForUser(req.user),
    email: req.user.email,
  })
}

exports.signup = async (req, res) => {
  if (!SIGN_UP_OPEN) return res.json({ error: 'Signup closed!' })

  const { email, password } = req.body

  if (!email || !password) {
    return res.json({ error: 'You must provide email and password' })
  }

  // See if a user with the given email exists
  try {
    // If a user with email does exist, return an error
    const foundUser = await db.User.findOne({ 
      where: { email }
    })
    if (foundUser) return res.json({ error: 'Email is in use' })

    // If a user with email does NOT exist, create and save user record
    const newUser = await db.User.create({ 
      email, 
      password: hashPassword(password),
    })
    res.json({
      token: tokenForUser(newUser),
      email: newUser.email,
    })
  } catch (error) {
    res.json({ error })
  }
}
