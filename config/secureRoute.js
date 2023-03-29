import { NotFound, sendError, Unauthorized } from './errors.js'
import jwt from 'jsonwebtoken'
import User from '../models/users.js'
import 'dotenv/config'

export const secureRoute = async (req,res,next) => {
  try {
    // Locate token
    const authorization = req.headers.authorization

    // Error for is there is no token
    if (!authorization) throw new Unauthorized()

    // Clean header to get just token
    const token = authorization.replace('Bearer ', '')

    // Verify token
    const payload = jwt.verify(token, process.env.SECRET)

    // Find logged in user
    const loggedInUser = await User.findById(payload.sub)
    console.log(loggedInUser)
    if (!loggedInUser) throw new NotFound()

    // Set object of logged in user to req for later use
    req.loggedInUser = loggedInUser

    next()
  } catch (err) {
    sendError(err,res)
  }
}