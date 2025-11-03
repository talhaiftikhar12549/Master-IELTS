import express from "express";
import {
  handleContactForm,
  getContactListings,
  getContactListing,
  deleteContactListing,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/form", handleContactForm);

// Routes
router.route("/")
  .get(getContactListings);

router.route("/:id")
  .get(getContactListing)
  .delete(protect, deleteContactListing);

export default router;