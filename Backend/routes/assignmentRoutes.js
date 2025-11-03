// routes/assignmentRoutes.js
import express from 'express';
import { createAssignment, getAssignments, updateAssignment, deleteAssignment } from '../controllers/assignmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('admin', 'superadmin'), createAssignment)
  .get(getAssignments);

router.route('/:id')
  .put(protect, authorizeRoles('admin', 'superadmin'), updateAssignment)
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteAssignment);

export default router;