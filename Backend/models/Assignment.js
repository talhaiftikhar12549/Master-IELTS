import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: String,
  description: String,
  fileUrl: String, // optional file attached
  dueDate: { type: Date, required: true } // ⬅️ added due date
}, { timestamps: true });

export default mongoose.model('Assignment', assignmentSchema);
