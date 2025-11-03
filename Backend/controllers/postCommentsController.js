import Comments from '../models/PostComments.js';
import Posts from '../models/Posts.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all comments for a post (1-level nested)
// @route   GET /api/posts/:postId/comments
// @access  Public
export const getCommentsForPost = async (req, res, next) => {
  try {
    const topLevelComments = await Comments.find({
      post: req.params.postId,
      parentComment: null,
    })
      .populate('author', 'name')
      .sort('-createdAt');

    // Fetch replies for each top-level comment
    const commentsWithReplies = await Promise.all(
      topLevelComments.map(async (comment) => {
        const replies = await Comments.find({ parentComment: comment._id })
          .populate('author', 'name')
          .sort('createdAt'); // oldest to newest

        return {
          ...comment.toObject(),
          replies,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: commentsWithReplies.length,
      data: commentsWithReplies,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single comment
// @route   GET /api/comments/:id
// @access  Public
export const getComment = async (req, res, next) => {
  try {
    const comment = await Comments.findById(req.params.id).populate('author', 'name');

    if (!comment) {
      return next(new ErrorResponse(`Comments not found with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a comment or reply
// @route   POST /api/posts/:postId/comments
// @access  Private
export const createComment = async (req, res, next) => {
  try {
    const { content, parentComment } = req.body;

    const post = await Posts.findById(req.params.postId);
    if (!post) {
      return next(new ErrorResponse(`Post not found with ID: ${req.params.postId}`, 404));
    }

    const comment = await Comments.create({
      post: req.params.postId,
      author: req.user.id,
      content,
      parentComment: parentComment || null,
    });

    // Update counters
    if (parentComment) {
      await Comments.findByIdAndUpdate(parentComment, { $inc: { repliesCount: 1 } });
    } else {
      await Posts.findByIdAndUpdate(req.params.postId, { $inc: { commentsCount: 1 } });
    }

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
export const updateComment = async (req, res, next) => {
  try {
    let comment = await Comments.findById(req.params.id);

    if (!comment) {
      return next(new ErrorResponse(`Comments not found with ID: ${req.params.id}`, 404));
    }

    if (comment.author.toString() !== req.user.id) {
      return next(new ErrorResponse(`Not authorized to update this comment`, 403));
    }

    comment.content = req.body.content || comment.content;
    await comment.save();

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comments.findById(req.params.id);

    if (!comment) {
      return next(new ErrorResponse(`Comments not found with ID: ${req.params.id}`, 404));
    }

    if (comment.author.toString() !== req.user.id) {
      return next(new ErrorResponse(`Not authorized to delete this comment`, 403));
    }

    await comment.deleteOne();

    // Update counters
    if (comment.parentComment) {
      await Comments.findByIdAndUpdate(comment.parentComment, { $inc: { repliesCount: -1 } });
    } else {
      await Posts.findByIdAndUpdate(comment.post, { $inc: { commentsCount: -1 } });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
