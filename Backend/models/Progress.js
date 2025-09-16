import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, course: 1, lesson: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);