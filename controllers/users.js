import User from '../models/users.js'
import { sendError, NotFound } from '../config/errors.js'

// * GET SINGLE USER ROUTE
// Endpoint: /users/:userId
export const userSingle = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) throw new NotFound('User not found')
    return res.json(user)
  } catch (error) {
    sendError(res,error)
  }
}

