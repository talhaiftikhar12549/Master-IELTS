import express from "express";
import { getNote, updateNote } from "../controllers/notesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected (require login)
router.route("/")
  .get(protect, getNote)     
  .put(protect, updateNote); 

export default router;
