import Stage from '../models/stages.js'
import { NotFound, sendError } from '../config/errors.js'

// * Get all stages
// Endpoints: /stages
export const getStages = async (req, res) => {
  try {
    const stages = await Stage.find().populate('comments.owner')
    return res.json(stages)
  } catch (err) {
    return sendError(err, res)
  }
}

// * Get single stage
// Endpoints: /stages/:id
export const getSingleStage = async (req, res) => {
  try {
    const { id } = req.params
    const stage = await Stage.findById(id).populate('comments.owner')
    if (!stage) throw new NotFound('Stage not found')
    return res.json(stage)
  } catch (err) {
    return sendError(err, res)
  }
}

// * Update ID to attendance key
// Endpoint: /stages/:id/attendance
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params
    const loggedInUserId = req.loggedInUser._id
    const stage = await Stage.findById(id)
    if (!stage) throw new NotFound('Stage not found')
    const attendanceToUpdate = stage.attendance
    if (!attendanceToUpdate.includes(loggedInUserId)) {
      attendanceToUpdate.push(loggedInUserId)
    } else {
      attendanceToUpdate.splice(attendanceToUpdate.indexOf(loggedInUserId), 1)
    }
    await stage.save()
    return res.json(attendanceToUpdate)
  } catch (err) {
    return sendError(err, res)
  }
}