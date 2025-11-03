import mongoose from "mongoose";
import { slugify } from "../utils/slugify.js";

const fileSchema = new mongoose.Schema(
  {
    path: { type: String, required: true }, // relative or absolute file path
    type: { type: String, required: true }, // MIME type (video/mp4, image/png, application/pdf)
    size: { type: Number, required: true }, // file size in bytes
    originalName: { type: String }, // optional: original filename
  },
  { _id: false }
);

const lessonSchema = new mongoose.Schema(
  {
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
    type: { type: String, default: "video" }, // video, pdf, image, etc.
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    files: [fileSchema], // ⬅️ array of uploaded file info
    content: String,
  },
  { timestamps: true }
);

// Pre-save hook for slug
lessonSchema.pre("save", function (next) {
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

export default mongoose.model("Lesson", lessonSchema);