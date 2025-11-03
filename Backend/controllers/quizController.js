import Quiz from "../models/Quiz.js";
import Lesson from "../models/Lesson.js";

// CREATE Quiz
export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);

    if (req.body.lesson) {
      await Lesson.findByIdAndUpdate(req.body.lesson, {
        $addToSet: { quizzes: quiz._id },
      });
    }

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET all Quizzes
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("lesson", "title");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single Quiz
export const getQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId).populate("lesson", "title");

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Quiz
export const updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const existingQuiz = await Quiz.findById(quizId);

    if (!existingQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, {
      new: true,
    });

    // If lesson changed, update references
    if (req.body.lesson && req.body.lesson !== existingQuiz.lesson.toString()) {
      await Lesson.findByIdAndUpdate(existingQuiz.lesson, {
        $pull: { quizzes: quizId },
      });

      await Lesson.findByIdAndUpdate(req.body.lesson, {
        $addToSet: { quizzes: quizId },
      });
    }

    res.json(updatedQuiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (quiz && quiz.lesson) {
      await Lesson.findByIdAndUpdate(quiz.lesson, {
        $pull: { quizzes: quiz._id },
      });
    }

    res.json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
