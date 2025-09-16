import express from 'express';
import {
  getAllLessons,
  createLesson,
  getLessonById,
  updateLesson,
  deleteLesson
} from '../controllers/lessonController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Create a lesson under a course
router
  .route('/:topicId')
  .post(protect, authorizeRoles('admin', 'superadmin'), createLesson);

router
  .route('/')
  .get(getAllLessons)

// Operate on individual lessons
router
  .route('/:id')
  .get(getLessonById)
  .put(protect, authorizeRoles('admin', 'superadmin'), updateLesson)
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteLesson);

export default router;
