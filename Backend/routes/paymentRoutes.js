import express from 'express';
import {
  createPaymentIntent,
  confirmPayment,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// create stripe payment intent
router.post('/create-intent', protect, createPaymentIntent);

// confirm payment (webhook usually, but also client-side confirm)
router.post('/confirm', protect, confirmPayment);

export default router;
