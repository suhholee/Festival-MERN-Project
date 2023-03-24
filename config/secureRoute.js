import { NotFound, sendError, Unauthorized } from './errors.js'
import jwt from 'jsonwebtoken'
import User from '../models/users.js'
import 'dotenv/config'

export const secureRoute = async (req,res,next) => {
  try {
    // locate token
    const authorization = req.headers.authorization

    // error for is there is no token
    if (!authorization) throw new NotFound()

    // clean header to get just token
    const token = authorization.replace('Bearer ','')
    console.log('TOKEN ->',token)

    // verify token
    const payload = jwt.verify(token, process.env.SECRET)
    console.log('PAYLOAD ->', payload)

    // find logged in user
    const loggedInUser = await User.findById(payload.sub)
    if (!loggedInUser) throw new Unauthorized()
    // console.log(loggedInUser)

    // set object of logged in user to req for later use
    req.loggedInUser = loggedInUser
    // console.log(req.loggedInUser)

    next()
  } catch (err) {
    sendError(err,res)
  }
}