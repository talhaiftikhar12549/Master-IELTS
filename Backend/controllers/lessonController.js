import Lesson from "../models/Lesson.js";
import Topic from "../models/Topic.js";

// CREATE LESSON WITH FILE UPLOAD
export const createLesson = async (req, res) => {
  try {
    const { topicId } = req.params;

    // If files are uploaded, map them into schema format
    const files = req.files
      ? req.files.map((file) => {
          const folder = file.destination.split("/").pop(); // e.g. images, videos, pdfs
          return {
            path: `/uploads/${folder}/${file.filename}`, // ✅ correct relative path
            type: file.mimetype,
            size: Math.round(file.size / 1024),
            originalName: file.originalname,
          };
        })
      : [];

    const lesson = await Lesson.create({
      ...req.body,
      topic: topicId,
      files, // ⬅️ save uploaded file info
    });

    await Topic.findByIdAndUpdate(topicId, { $push: { lessons: lesson._id } });

    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL LESSONS
export const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate("topic", "title _id");
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET LESSON BY ID
export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate(
      "topic",
      "title _id"
    );
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE LESSON (can also accept new files)
export const updateLesson = async (req, res) => {
  try {
    const newFiles = req.files
      ? req.files.map((file) => {
          const folder = file.destination.split("/").pop();
          return {
            path: `/uploads/${folder}/${file.filename}`,
            type: file.mimetype,
            size: Math.round(file.size / 1024),
            originalName: file.originalname,
          };
        })
      : [];

    const updateData = {
      ...req.body,
    };

    if (newFiles.length > 0) {
      updateData.$push = { files: { $each: newFiles } };
    }

    const lesson = await Lesson.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE LESSON
export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    // Remove from Topic
    await Topic.findByIdAndUpdate(lesson.topic, {
      $pull: { lessons: lesson._id },
    });

    res.json({ message: "Lesson deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
