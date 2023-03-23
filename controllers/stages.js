import Stage from '../models/stages.js'
import { Unauthorized, NotFound, sendError } from '../config/errors.js'

// * INDEX route
// Endpoints: /stages
export const getStages = async (req, res) => {
  try {
    console.log('GET STAGES')
  } catch (err) {
    return sendError(err, res)
  }
}