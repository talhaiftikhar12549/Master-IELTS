import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  getCourseProgress,
  toggleLessonProgress,
  getAllCoursesProgress,
  getUserCoursesProgress,
} from "../controllers/progressController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllCoursesProgress);
router.get("/course/:courseId", protect, getCourseProgress);
router.get(
  "/user/:userId",
  protect,
  authorizeRoles("admin", "superadmin"),
  getUserCoursesProgress
);
router.put("/lesson/:lessonId", protect, toggleLessonProgress);

export default router;
