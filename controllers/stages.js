import Stage from '../models/stages.js'
import { NotFound, sendError } from '../config/errors.js'

// * Get all stages
// Endpoints: /stages
export const getStages = async (req, res) => {
  try {
    const stages = await Stage.find()
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
    const stage = await Stage.findById(id)
    if (!stage) {
      throw new NotFound('Stage not found')
    }
    return res.json(stage)
  } catch (err) {
    return sendError(err, res)
  }
}