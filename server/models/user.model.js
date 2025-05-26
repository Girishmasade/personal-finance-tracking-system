import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
