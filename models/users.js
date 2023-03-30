import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// * Fields
// Username
// Email
// Password
// passwordConfirmation

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
})

userSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    delete ret.password
  },
})

// * Virtual schema for password confirmation
userSchema
  .virtual('passwordConfirmation')
  .set(function(userPasswordConfirmation){
    this._passwordConfirmation = userPasswordConfirmation
  })

// * Virtual for comments


// Check password and password confirmation matches
userSchema
  .pre('validate', function(next){
    // if password is modified, and password and password confirmation don't match,
    // invalidate password confirmation field
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Passwords do not match')
    }
    next()
  })

// * Hash Password
userSchema.pre('save', function(next){
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(12)
    this.password = bcrypt.hashSync(this.password, salt)
  }
  next()
})

// * Validate password method
userSchema.methods.validatePassword = function(plainTextPassword){
  return bcrypt.compare(plainTextPassword, this.password)
}



export default mongoose.model('User', userSchema)
