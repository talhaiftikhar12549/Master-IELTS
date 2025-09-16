import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, index: true }, // ✅ Add slug
  description: String,
  level: String,
  duration: String,
  price: { type: Number, default: 0 },
  thumbnail: String, 
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft' },
  tags: [String],
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }]
}, { timestamps: true });

// Pre-save hook
courseSchema.pre("save", function(next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});

export default mongoose.model('Course', courseSchema);