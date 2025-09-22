import express from 'express';
import {
  createPaymentIntent,
  confirmPayment,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// create stripe payment intent
router.post('/create-intent', createPaymentIntent);

// confirm payment (webhook usually, but also client-side confirm)
router.post('/confirm', confirmPayment);

export default router;
