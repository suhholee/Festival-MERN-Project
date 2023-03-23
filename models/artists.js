import mongoose from 'mongoose'

// ! Schema
const artistSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stage: { type: String, required: true, unique: true },
  url: { type: String, required: true },
})

// ! Model
export default mongoose.model('Artist', artistSchema)