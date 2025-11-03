import express from 'express';
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorizeRoles('admin', 'superadmin'), createCourse)
  .get(getCourses);

router
  .route('/:id')
  .get(getCourseById)
  .put(protect, authorizeRoles('admin', 'superadmin'), updateCourse)
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteCourse);

export default router;
