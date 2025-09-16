import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
   type: {
    type: String,
    required: true,
  },
  response: mongoose.Schema.Types.Mixed,  
  
  isCorrect: { type: Boolean, default: false }
});

const quizAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },

  answers: [answerSchema],

  attemptNumber: { type: Number, default: 1 },

  score: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
  duration: { type: Number }, // seconds
}, { timestamps: true });

export default mongoose.model("QuizAttempt", quizAttemptSchema);