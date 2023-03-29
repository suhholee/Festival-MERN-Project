import mongoose from 'mongoose'

// ! Comment Schema (Embedded)
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true,  maxlength: 300 },
  likes: { type: Array },
  owner: { type: [mongoose.Schema.ObjectId], ref: 'User', required: true },
  // stage: { type: mongoose.Schema.ObjectId, ref: 'Stage', required: true },
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