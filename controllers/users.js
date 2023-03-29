import User from '../models/users.js'
import Stage from '../models/stages.js'
import { sendError } from '../config/errors.js'


export const userSingle = async(req,res) => {
  try {
    const { userId } = req.params
    console.log('running')
    const user = await User.findById(userId)
    return res.json(user)
    
  } catch (error) {
    sendError(res,error)
  }
}

// export const userComments = async (req,res) => {
//   console.log('runnang')
//   try {
//     const { userId } = req.params
//     const stages = await Stage.find()
//     const comments = stages.map( stage => stage.comments)
//     const userComments = comments.map( comments => comments.filter(comment => comment.owner.includes(userId) ) )
//     return res.json(userComments)
//   } catch (error) {
//     sendError(res,error)
//   }
// }

