import Discussion from "../models/Discussion.js";
import Lesson from "../models/Lesson.js";

/**
 * @desc    Get all comments for a lesson (with replies populated)
 * @route   GET /api/discussion/:lessonId
 * @access  Public
 */
export const getCommentsForLesson = async (req, res) => {
  const { lessonId } = req.params;

  try {
    const comments = await Discussion.find({ lesson: lessonId })
      .populate("user", "name")
      .populate("replies.user", "name")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @desc    Get a single comment
 * @route   GET /api/discussion/comment/:id
 * @access  Public
 */
export const getComment = async (req, res) => {
  try {
    const comment = await Discussion.findById(req.params.id)
      .populate("user", "name")
      .populate("replies.user", "name");

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ success: true, data: comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @desc    Create a comment on a lesson
 * @route   POST /api/discussion/:lessonId
 * @access  Private
 */
export const createComment = async (req, res) => {
  const { lessonId } = req.params;
  const { comment } = req.body;

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Invalid lesson ID" });
    }

    const newComment = await Discussion.create({
      lesson: lessonId,
      user: req.user.id,
      comment,
    });

    const populatedComment = await newComment.populate("user", "name");

    res.status(201).json({ success: true, data: populatedComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Update a comment
// @route   PUT /api/discussion/:commentId
// @access  Private
export const updateComment = async (req, res) => {
  try {
    const comment = await Discussion.findById(req.params.commentId);

    if (!comment) {
      return res
        .status(404)
        .json({
          message: `Comment not found with ID: ${req.params.commentId}`,
        });
    }

    // Make sure the logged-in user is the author
    if (comment.user.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this comment" });
    }

    // update the correct field
    comment.comment = req.body.comment || comment.comment;
    await comment.save();

    res.json({ success: true, data: comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/discussion/:commentId
// @access  Private
export const deleteComment = async (req, res) => {
  try {
    const comment = await Discussion.findById(req.params.commentId);

    if (!comment) {
      return res
        .status(404)
        .json({
          message: `Comment not found with ID: ${req.params.commentId}`,
        });
    }

    // Make sure the logged-in user is the author
    if (!comment.user || comment.user.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();

    res.json({ message: "Comment removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add reply
// @route POST /api/discussion/comment/:commentId/replies
export const addReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Discussion.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const reply = {
      user: req.user.id,
      comment: req.body.comment,
    };

    comment.replies.push(reply);
    await comment.save();

    // ✅ re-fetch and populate properly
    const populatedComment = await Discussion.findById(commentId)
      .populate("user", "name")
      .populate("replies.user", "name");

    res.status(201).json({ success: true, data: populatedComment });
  } catch (err) {
    console.error("addReply error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * @desc    Update a reply
 * @route   PUT /api/discussion/comment/:commentId/reply/:replyId
 * @access  Private
 */
export const updateReply = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const comment = await Discussion.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const reply = comment.replies.id(replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    if (reply.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this reply" });
    }

    reply.comment = req.body.comment || reply.comment;
    await comment.save();

    // ✅ re-fetch and populate properly
    const populatedComment = await Discussion.findById(commentId)
      .populate("user", "name")
      .populate("replies.user", "name");

    res.status(200).json({ success: true, data: populatedComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @desc    Delete a reply
 * @route   DELETE /api/discussion/comment/:commentId/reply/:replyId
 * @access  Private
 */
export const deleteReply = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const comment = await Discussion.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const reply = comment.replies.id(replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    if (reply.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this reply" });
    }

    reply.deleteOne();
    await comment.save();

    // ✅ re-fetch and populate properly
    const populatedComment = await Discussion.findById(commentId)
      .populate("user", "name")
      .populate("replies.user", "name");

    res.status(200).json({ success: true, data: populatedComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * @desc    Get lessons the current user has commented on
 * @route   GET /api/discussion/my-lessons
 * @access  Private
 */
export const getLessonsUserCommentedOn = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find discussions where the user is the author OR has replies
    const discussions = await Discussion.find({
      $or: [{ user: userId }, { "replies.user": userId }],
    }).populate({
      path: "lesson",
      select: "title description slug topic",
      populate: {
        path: "topic",
        select: "course",
        populate: {
          path: "course",
          select: "slug title",
        },
      },
    });

    // Extract unique lessons
    const lessonMap = new Map();
    discussions.forEach((disc) => {
      if (disc.lesson) {
        lessonMap.set(disc.lesson._id.toString(), disc.lesson);
      }
    });

    const lessons = Array.from(lessonMap.values());

    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
