import express from 'express'
import { getArtists } from '../controllers/artists.js'
import { loginUser, registerUser } from '../controllers/auth.js'
import { getSingleStage, getStages } from '../controllers/stages.js'
import { addComment, deleteComment, updateComment, updateLikes } from '../controllers/comments.js'
import { secureRoute } from './secureRoute.js'
import { userSingle } from '../controllers/users.js'

const router = express.Router()

router.route('/stages')
  .get(getStages)

router.route('/stages/:id')
  .get(getSingleStage)

router.route('/stages/:id/comments')
  .post(secureRoute, addComment)

router.route('/stages/:stageId/comments/:commentId')
  .delete(secureRoute, deleteComment)
  .put(secureRoute, updateComment)

router.route('/stages/:stageId/comments/:commentId/likes')
  .put(secureRoute, updateLikes)

router.route('/artists')
  .get(getArtists)

router.route('/users/:userId')
  .get(userSingle)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)


  
export default router