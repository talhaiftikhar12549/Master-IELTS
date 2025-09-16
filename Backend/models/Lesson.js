import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const lessonSchema = new mongoose.Schema({
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  type: { type: String, default: 'video' },
  title: { type: String, required: true },
  slug: { type: String, unique: true, index: true }, // ✅ add slug
  videoUrl: String,
  resources: [String], // PDFs, links, etc.
  content: String,
}, { timestamps: true });

// Pre-save hook for slug
lessonSchema.pre("save", function(next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});

// Virtual field for discussions
lessonSchema.virtual("discussions", {
  ref: "Discussion",
  localField: "_id",
  foreignField: "lesson",
});

// Ensure virtuals are included in JSON
lessonSchema.set("toObject", { virtuals: true });
lessonSchema.set("toJSON", { virtuals: true });

export default mongoose.model('Lesson', lessonSchema);