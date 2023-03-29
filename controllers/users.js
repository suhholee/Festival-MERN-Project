import User from '../models/users.js'


export const userSingle = async(req,res) => {
  console.log('running')
  const { id } = req.params
  const user = await User.findById(id)
}