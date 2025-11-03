import express from "express";
import multer from "multer";
import {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogsController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Error handling middleware for file uploads
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  } else if (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "File upload failed",
    });
  }
  next();
};

// Routes
router
  .route("/")
  .get(getAllBlogs)
  .post(protect, upload.single("featuredImage"), handleUploadErrors, createBlog);

router
  .route("/:idOrSlug")
  .get(getSingleBlog)
  .put(
    protect,
    upload.single("featuredImage"),
    handleUploadErrors,
    updateBlog
  )
  .delete(protect, deleteBlog);

export default router;
