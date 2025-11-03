import QuizAttempt from "../models/QuizAttempts.js";
import Quiz from "../models/Quiz.js";

// Get all quiz attempts (Admin)
export const getAllQuizAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find()
      .populate("user", "name email")
      .populate({
        path: "quiz",
        select: "title courseId",
        populate: {
          path: "courseId",
          select: "title",
        },
      })
      .populate("lesson", "title"); 

    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Start a new quiz attempt
export const startQuizAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user.id; // assuming you're using auth middleware

    // Check if quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Create attempt
    const attempt = await QuizAttempt.create({
      user: userId,
      quiz: quizId,
      lesson: quiz.lesson,
      status: "in-progress",
    });

    res.status(201).json(attempt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Submit answers for an attempt
export const submitQuizAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { answers } = req.body; // array of { questionId, type, response }

    const attempt = await QuizAttempt.findById(attemptId).populate("quiz");
    if (!attempt) {
      return res.status(404).json({ error: "Attempt not found" });
    }

    // Prevent resubmitting completed attempts
    if (attempt.completed) {
      return res.status(400).json({ error: "Attempt already submitted" });
    }

    const quiz = await Quiz.findById(attempt.quiz);

    let score = 0;
    const evaluatedAnswers = answers.map((ans) => {
      const question = quiz.questions.id(ans.questionId);
      if (!question) return { ...ans, isCorrect: false };

      let isCorrect = false;

      switch (question.type) {
        case "mcq":
        case "trueFalse":
        case "fill":
        case "short":
          isCorrect =
            JSON.stringify(ans.response) ===
            JSON.stringify(question.correctAnswer);
          break;

        case "matchingHeadings":
          // Compare order arrays
          isCorrect =
            JSON.stringify(ans.response) ===
            JSON.stringify(question.correctOrder);
          break;

        default:
          isCorrect = false;
      }

      if (isCorrect) score += 1;

      return { ...ans, isCorrect };
    });

    attempt.answers = evaluatedAnswers;
    attempt.score = score;
    attempt.submittedAt = new Date();
    attempt.completed = true;
    attempt.status = "completed";
    attempt.duration =
      (attempt.submittedAt.getTime() - attempt.startedAt.getTime()) / 1000; // seconds

    await attempt.save();

    res.json({
      message: "Quiz submitted successfully",
      score,
      total: quiz.questions.length,
      attempt,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all attempts for current user
export const getMyQuizAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user.id })
      .populate("quiz", "title")
      .populate("lesson", "title");
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single attempt
export const getQuizAttempt = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.attemptId)
      .populate("quiz", "title questions")
      .populate("lesson", "title");

    if (!attempt) {
      return res.status(404).json({ error: "Attempt not found" });
    }

    res.json(attempt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete attempt (optional, for admin/reset)
export const deleteQuizAttempt = async (req, res) => {
  try {
    await QuizAttempt.findByIdAndDelete(req.params.attemptId);
    res.json({ message: "Attempt deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
