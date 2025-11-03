// controllers/progressController.js
import Progress from "../models/Progress.js";
import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

export const getAllCoursesProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all progress docs for this user
    const progresses = await Progress.find({ user: userId, completed: true }).populate("course");

    // Group by course
    const courseProgressMap = {};
    progresses.forEach((p) => {
      const courseId = p.course._id.toString();
      if (!courseProgressMap[courseId]) {
        courseProgressMap[courseId] = {
          courseId,
          courseTitle: p.course.title,
          completedLessons: new Set(),
        };
      }
      courseProgressMap[courseId].completedLessons.add(p.lesson.toString());
    });

    // Get total lessons for each course
    const courses = await Course.find().populate({
      path: "topics",
      populate: { path: "lessons" },
    });

    const result = courses.map((course) => {
      const totalLessons = course.topics.reduce(
        (acc, t) => acc + t.lessons.length,
        0
      );
      const completedLessons =
        courseProgressMap[course._id.toString()]?.completedLessons.size || 0;

      return {
        courseId: course._id,
        courseTitle: course.title,
        totalLessons,
        completedLessons,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("getAllCoursesProgress error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get all course progress for a specific user (by userId param)
 */
export const getUserCoursesProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch all progress docs for this user
    const progresses = await Progress.find({ user: userId, completed: true }).populate("course");

    // Group by course
    const courseProgressMap = {};
    progresses.forEach((p) => {
      const courseId = p.course._id.toString();
      if (!courseProgressMap[courseId]) {
        courseProgressMap[courseId] = {
          courseId,
          courseTitle: p.course.title,
          completedLessons: new Set(),
        };
      }
      courseProgressMap[courseId].completedLessons.add(p.lesson.toString());
    });

    // Get all courses with lesson counts
    const courses = await Course.find().populate({
      path: "topics",
      populate: { path: "lessons" },
    });

    const result = courses.map((course) => {
      const totalLessons = course.topics.reduce(
        (acc, t) => acc + t.lessons.length,
        0
      );
      const completedLessons =
        courseProgressMap[course._id.toString()]?.completedLessons.size || 0;

      return {
        courseId: course._id,
        courseTitle: course.title,
        totalLessons,
        completedLessons,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("getUserCoursesProgress error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle lesson completion
export const toggleLessonProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.params;
    const { completed } = req.body;

    // Get lesson’s course
    const lesson = await Lesson.findById(lessonId).populate("topic");
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    const courseId = lesson.topic.course;

    // Upsert progress
    const progress = await Progress.findOneAndUpdate(
      { user: userId, course: courseId, lesson: lessonId },
      { completed },
      { new: true, upsert: true }
    );

    res.json({
      lessonId,
      completed: progress.completed,
    });
  } catch (err) {
    console.error("toggleLessonProgress error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all completed lessons for a course
export const getCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const progresses = await Progress.find({
      user: userId,
      course: courseId,
      completed: true,
    });

    res.json({
      completedLessons: progresses.map((p) => p.lesson.toString()),
    });
  } catch (err) {
    console.error("getCourseProgress error:", err);
    res.status(500).json({ message: "Server error" });
  }
};