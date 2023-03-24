import Stage from '../models/stages.js'
import { Unauthorized, NotFound, sendError } from '../config/errors.js'

// * INDEX route
// Endpoints: /stages
export const getStages = async (req, res) => {
  try {
    const stages = await Stage.find()
    console.log(stages)
    return res.json(stages)
  } catch (err) {
    return sendError(err, res)
  }
}