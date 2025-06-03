import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const transactionSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    userRef:{
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true
    },
    type: {
      type: String,
      enum: ["Expense", "Income"],
      default: "Expense",
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
