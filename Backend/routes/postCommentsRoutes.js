import express from 'express';
import {
  getCommentsForPost,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/postCommentsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Nested route: /api/posts/:postId/comments
router
  .route('/post/:postId')
  .get(getCommentsForPost)
  .post(protect, createComment);

// Individual comment routes: /api/comments/:id
router
  .route('/:id')
  .get(getComment)
  .put(protect, updateComment)
  .delete(protect, deleteComment);

export default router;