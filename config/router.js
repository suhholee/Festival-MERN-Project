import express from 'express'
import { registerUser } from '../controllers/auth'

const router = express.Router()

router.Route('/register')
  .post(registerUser)