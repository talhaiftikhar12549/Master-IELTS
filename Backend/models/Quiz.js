// models/Quiz.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: mongoose.Schema.Types.Mixed,
   type: {
    type: String,
    required: true,
  },

  // For Matching Headings
  statementHeading: { type: String },
  statementDescription: { type: String },
  paragraphs: [{ type: String }],
  correctOrder: [{ type: String }],
});

const quizSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  title: String,
  questions: [questionSchema],
  timer: Number, // seconds
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);

// import mongoose from "mongoose";

// const optionSchema = new mongoose.Schema({
//   label: String, // e.g. "A", "B", "C"
//   text: String,  // the option text
// });

// const matchSchema = new mongoose.Schema({
//   left: String,
//   right: String,
// });

// const questionSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   qtype: { 
//     type: String, 
//     // enum: ["mcq", "truefalse", "fill", "multiple", "short", "matching"], 
//     required: true 
//   },
//   options: [optionSchema],         
//   correctAnswer: mongoose.Schema.Types.Mixed, 
//   matchingPairs: [matchSchema],     
// });

// const quizSchema = new mongoose.Schema({
//   lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
//   title: { type: String, required: true },
//   questions: [questionSchema],
//   timer: Number, // seconds
// }, { timestamps: true });

// export default mongoose.model("Quiz", quizSchema);
