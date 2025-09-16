import Topic from "../models/Topic.js";
import Course from "../models/Course.js";

export const createTopic = async (req, res) => {
  try {
    const { courseId } = req.params;
    const topic = await Topic.create({ ...req.body, course: courseId });

    await Course.findByIdAndUpdate(courseId, { $push: { topics: topic._id } });

    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().populate("course", "title _id");
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    await Course.findByIdAndUpdate(topic.course, {
      $pull: { topics: topic._id },
    });

    res.json({ message: "Topic deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
