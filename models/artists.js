import mongoose from 'mongoose'

// ! Schema
const artistSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stageName: { type: mongoose.Schema.ObjectId, ref: 'Stage', required: true },
  genre: { type: String, required: true },
  url: { type: String },
})

// ! Model
export default mongoose.model('Artist', artistSchema)