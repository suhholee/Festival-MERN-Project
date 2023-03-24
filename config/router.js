import express from 'express'
import { getArtists } from '../controllers/artists.js'
import { loginUser, registerUser } from '../controllers/auth.js'
import { getSingleStage, getStages } from '../controllers/stages.js'
import { addComment, deleteComment, getComments, updateComment } from '../controllers/comments.js'

const router = express.Router()

router.route('/stages')
  .get(getStages)

router.route('/stages/:id')
  .get(getSingleStage)

router.route('/stages/:id/comments')
  .get(getComments)
  .post(addComment)

router.route('/stages/:stageId/comments/:commentId')
  .delete(deleteComment)
  .put(updateComment)

router.route('/artists')
  .get(getArtists)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)
  
export default router