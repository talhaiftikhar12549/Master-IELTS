import express from 'express';
import {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic
} from '../controllers/topicController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Create a topic under a course
router
  .route('/:courseId')
  .post(protect, authorizeRoles('admin', 'superadmin'), createTopic);

  router
  .route('/')
  .get(getAllTopics)

// Operate on individual topics
router
  .route('/topicId/:id')
  .get(getTopicById)
  .put(protect, authorizeRoles('admin', 'superadmin'), updateTopic)
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteTopic);

export default router;
