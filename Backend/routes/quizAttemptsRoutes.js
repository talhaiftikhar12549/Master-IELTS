import express from "express";
import {
  startQuizAttempt,
  submitQuizAttempt,
  getMyQuizAttempts,
  getQuizAttempt,
  deleteQuizAttempt,
  getAllQuizAttempts,
} from "../controllers/quizAttemptsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:quizId/start", protect, startQuizAttempt);
router.post("/:attemptId/submit", protect, submitQuizAttempt);

router.get("/", protect, getAllQuizAttempts);

router.get("/my", protect, getMyQuizAttempts);
router.get("/:attemptId", protect, getQuizAttempt);
router.delete("/:attemptId", protect, deleteQuizAttempt);

export default router;