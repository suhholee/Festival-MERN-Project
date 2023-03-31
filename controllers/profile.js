import User from '../models/users.js'
import { NotFound, sendError } from '../config/errors.js'


const addProfile = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!userId){
      throw new NotFound('User Not Found')
    }
    user.image = req.body.image
    await user.save()
    return res.json(user.image)
  } catch (err) {
    console.log(err)
    return sendError(err, res)
  }
}

export default addProfile
