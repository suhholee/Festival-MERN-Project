import { NotFound, sendError, Unauthorized } from './errors.js'
import jwt from 'jsonwebtoken'
import User from '../models/users.js'
// import 'dotenv.config'
import * as dotenv from 'dotenv'
dotenv.config()

export const secureRoute = async (req,res,next) => {
  try {
    // locate token
    const authorization = req.headers.authorization
    // error for is there is no token
    if (!authorization) throw new NotFound()
    // clean up
    const token = authorization.replace('Bearer ','')
    console.log('TOKEN ->',token)
    const payload = jwt.verify( token, process.env.SECRET)
    if (!payload) throw new Unauthorized()
    const loggedInUser = await User.findById(payload.sub)
    // console.log(loggedInUser)
    if (!loggedInUser) throw new Unauthorized()
    req.loggedInUser = loggedInUser
    console.log(req.loggedInUser)
    next()
  } catch (err) {
    sendError(err,res)
  }
}