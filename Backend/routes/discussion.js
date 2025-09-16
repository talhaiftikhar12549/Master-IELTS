import express from 'express';
import {
  getCommentsForLesson,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  addReply,
  updateReply,
  deleteReply,
  getLessonsUserCommentedOn, // ✅ new import
} from '../controllers/discussionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Comments for a lesson
router
  .route('/lesson/:lessonId')
  .get(getCommentsForLesson)
  .post(protect, createComment);

// Individual comment
router
  .route('/comment/:commentId')
  .get(getComment)
  .put(protect, updateComment)
  .delete(protect, deleteComment);

// Replies 
router.post('/comment/:commentId/replies', protect, addReply);
router
  .route('/comment/:commentId/replies/:replyId')
  .put(protect, updateReply)
  .delete(protect, deleteReply);

// ✅ Get all lessons the logged-in user has commented on
router.get('/my-lessons', protect, getLessonsUserCommentedOn);

export default router;
