// routes/quizRoutes.js
import express from 'express';
import {
  createQuiz,
  getQuizzes,
  updateQuiz,
  deleteQuiz,
  getQuiz,
} from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Create a quiz for a lesson (lessonId will come from req.body.lesson)
router.route('/')
  .post(protect, authorizeRoles('admin', 'superadmin'), createQuiz)
  .get(getQuizzes);

// Update / delete by quizId
router.route('/:id')
  .get(getQuiz)
  .put(protect, authorizeRoles('admin', 'superadmin'), updateQuiz)
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteQuiz);

export default router;