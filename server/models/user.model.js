import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  email:{
    type: String,
    trim:true,
    unique: true,
    required: true
  },
  password:{
    type: String,
    trim:true,
    required: true
  },
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
export default User