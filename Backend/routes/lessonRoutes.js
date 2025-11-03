import express from "express";
import {
  getAllLessons,
  createLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "../controllers/lessonController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; 

const router = express.Router();

// Create a lesson under a topic (with file uploads)
router
  .route("/:topicId")
  .post(
    protect,
    authorizeRoles("admin", "superadmin"),
    upload.array("resources", 10),
    createLesson
  );

// Get all lessons
router.route("/").get(getAllLessons);

// Operate on individual lessons
router
  .route("/:id")
  .get(getLessonById)
  .put(
    protect,
    authorizeRoles("admin", "superadmin"),
    upload.array("resources", 10),
    updateLesson
  )
  .delete(protect, authorizeRoles("admin", "superadmin"), deleteLesson);

export default router;