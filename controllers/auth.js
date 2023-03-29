import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { Unauthorized, sendError } from '../config/errors.js'


// * REGISTER ROUTE
// Endpoint: /register
export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    console.log(newUser)
    return res.status(201).json({ message: `Welcome ${newUser.username} :) ` })
  } catch (err) {
    sendError(err, res)
  }
}



// * LOGIN ROUTE
// Endpoint: /login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const userToLogin = await User.findOne({ email: email })
    const userIsValidated = await userToLogin.validatePassword(password)
    if (!userToLogin || !userIsValidated) throw new Unauthorized()
    const token = jwt.sign( { sub: userToLogin._id }, process.env.SECRET , { expiresIn: '7d' })
    return res.json({ message: `Welcome back, ${userToLogin.username}`, token: token, id: userToLogin._id })
  } catch (err) {
    sendError(err, res)
  }
}