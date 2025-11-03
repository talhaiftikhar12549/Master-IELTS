import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      default: "Untitled Note",
    },
    content: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#fff8b5",
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", noteSchema);

export default Notes;
