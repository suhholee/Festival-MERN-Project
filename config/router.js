import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { getStages } from '../controllers/stages.js'

const router = express.Router()

router.route('/stages')
  .get(secureRoute,getStages)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)


  
export default router