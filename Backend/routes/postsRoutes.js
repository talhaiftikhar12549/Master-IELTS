import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  upvotePost,
  downvotePost,
} from "../controllers/PostsController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router
  .route("/")
  .get(getPosts)
  .post(protect, createPost);

router
  .route("/:id")
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.post("/:id/upvote", protect, upvotePost);
router.post("/:id/downvote", protect, downvotePost);

export default router;
