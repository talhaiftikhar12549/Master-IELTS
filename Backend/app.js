import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import discussionRoutes from './routes/discussion.js';
import postRoutes from './routes/postsRoutes.js'
import postCommentsRoutes from './routes/postCommentsRoutes.js'
import quizAttemptRoutes from './routes/quizAttemptsRoutes.js'
import blogRoutes from "./routes/blogRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import progressRoutes from "./routes/progressRoutes.js"
import planRoutes from "./routes/planRoutes.js";
import notesRoutes from "./routes/notesRoutes.js"
import path from 'path';

const app = express();
connectDB();

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/quizAttempts', quizAttemptRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/discussion', discussionRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comments', postCommentsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/progress', progressRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/notes", notesRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(errorHandler);

export default app;
