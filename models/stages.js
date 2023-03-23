import mongoose from 'mongoose'

// ! Likes Schema (Embedded)
// The likes schema is consisted of the users' information as it is added when clicked
const likesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

// ! Comment Schema (Embedded)
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  likes: [likesSchema],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

// ! Schema
const stageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  comments: [commentSchema],
})

// ! Model
export default mongoose.model('Stage', stageSchema)