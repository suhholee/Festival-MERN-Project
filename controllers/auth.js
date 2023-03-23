import User from '../models/users.js'

export const registerUser = async (req,res) => {
  try {
    const newUser = await User.create(req.body)
    console.log(newUser)
    return res.status(201).json(`welcome ${newUser.username} :) `)
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async (req,res) => {
  try {
    console.log('runnang')
  } catch (error) {
    console.log('error')
  }
}