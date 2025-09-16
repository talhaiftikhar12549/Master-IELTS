import mongoose from 'mongoose';

const blogsSchema = new mongoose.Schema({
  featuredImage: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  meta_title: {
    type: String,
    required: true,
    trim: true,
  },
  meta_description: {
    type: String,
    required: true,
    trim: true,
  },
  keywords: [String],
  categories: [String],
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  excerpt: {
    type: String,
    default: '',
    maxlength: 300,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  views: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.model('Blogs', blogsSchema);