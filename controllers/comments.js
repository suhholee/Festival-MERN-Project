import { NotFound, sendError, Unauthorized } from '../config/errors.js'
import Stage from '../models/stages.js'

// * Add Comment
// Endpoint: /stages/:stageId/comments
export const addComment = async (req, res) => {
  try {
    const { id } = req.params
    const stage = await Stage.findById(id).populate('comments.owner')
    if (!stage) throw new NotFound('Stage Not Found')
    const commentToAdd = { ...req.body, owner: req.loggedInUser }
    stage.comments.push(commentToAdd)
    await stage.save()
    return res.status(201).json(stage)
  } catch (err) {
    return sendError(err, res)
  }
}

// * Delete Comment
// Endpoint: /stages/:stageId/comments/:commentId
export const deleteComment = async (req, res) => {
  try {
    const { stageId, commentId } = req.params
    const loggedInUserId = req.loggedInUser._id
    const stage = await Stage.findById(stageId)
    if (!stage) throw new NotFound('Stage not found')
    const commentToDelete = stage.comments.id(commentId)
    if (!commentToDelete) throw new NotFound('Comment not found')
    if (!commentToDelete.owner.equals(loggedInUserId)) throw new Unauthorized('Unauthorized')
    await commentToDelete.deleteOne()
    await stage.save()
    return res.sendStatus(204)
  } catch (err) {
    return sendError(err, res)
  }
}

// * Update Comment
// Endpoint: /stages/:stageId/comments/:commentId
export const updateComment = async (req, res) => {
  try {
    const { stageId, commentId } = req.params
    const loggedInUserId = req.loggedInUser._id
    const stage = await Stage.findById(stageId).populate('comments.owner')
    if (!stage) throw new NotFound('Stage not found')
    const commentToUpdate = stage.comments.id(commentId)
    if (!commentToUpdate) throw new NotFound('Comment not found')
    if (!commentToUpdate.owner.equals(loggedInUserId)) throw new Unauthorized('Unauthorized')
    Object.assign(commentToUpdate, req.body)
    await stage.save()
    return res.json(commentToUpdate)
  } catch (err) {
    return sendError(err, res)
  }
}

// * Update ID to likes key
// Endpoint: /stages/:stageId/comments/:commentId/likes
export const updateLikes = async (req, res) => {
  try {
    const { stageId, commentId } = req.params
    const loggedInUserId = req.loggedInUser._id
    const stage = await Stage.findById(stageId)
    if (!stage) throw new NotFound('Stage not found')
    const commentToUpdate = stage.comments.id(commentId)
    if (!commentToUpdate) throw new NotFound('Comment not found')
    const likesToUpdate = commentToUpdate.likes
    if (!likesToUpdate.includes(loggedInUserId)) {
      likesToUpdate.push(loggedInUserId)
    } else {
      likesToUpdate.splice(likesToUpdate.indexOf(loggedInUserId), 1)
    }
    await stage.save()
    return res.json(commentToUpdate)
  } catch (err) {
    return sendError(err, res)
  }
}
