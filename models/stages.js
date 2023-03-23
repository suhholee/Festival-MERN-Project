import mongoose from 'mongoose'

// ! Schema
const stageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  comments: [commentSchema],
})

// ! Comment Schema (Embedded)
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  likes: [likesSchema],
}, {
  timestamps: true,
})

// ! Likes Schema (Embedded)
// The likes schema is consisted of the users' information as it is added when clicked
const likesSchema = new mongoose.Schema({
  // Likes User ID
})

// ! Model
export default mongoose.model('Stage', stageSchema)