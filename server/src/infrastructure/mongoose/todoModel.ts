import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TodoModel = mongoose.model("Todo", todoSchema);
