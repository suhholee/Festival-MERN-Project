import User from '../models/users.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { Unauthorized,sendError } from '../config/errors.js'


// REGISTER
export const registerUser = async (req,res) => {
  try {
    const newUser = await User.create(req.body)
    console.log(newUser)
    return res.status(201).json(`welcome ${newUser.username} :) `)
  } catch (err) {
    sendError(err, res)
  }
}


// LOGIN
export const loginUser = async (req,res) => {
  try {
    const { email,password } = req.body
    const userToLogin = await User.findOne({ email: email })
    if (!userToLogin) throw new Unauthorized()
    const userIsValidated = await userToLogin.validatePassword(password)
    if (!userToLogin || !userIsValidated){
      throw new Error()
    }
    const token = jwt.sign( { sub: userToLogin._id }, process.env.SECRET , { expiresIn: '7d' })
    return res.json({ message: `welcome back, ${userToLogin.username}, token: ${token}` })
  } catch (err) {
    sendError(err, res)
  }
}