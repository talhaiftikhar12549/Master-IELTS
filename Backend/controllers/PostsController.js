import Post from '../models/Posts.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res, next) => {
  try {
    let queryObj = { ...req.query };
    const removeFields = ['sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete queryObj[param]);

    // Advanced filtering (gt, gte, lt, lte, in)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    let filter = JSON.parse(queryStr);

    // Search filter
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: 'i' };
    }

    // Filter by community
    if (req.query.community) {
      filter.community = req.query.community;
    }

    let query = Post.find(filter).populate('author', 'name');

    // Sorting
    if (req.query.sort === 'upvoteCount') {
      query = query.sort({ upvoteCount: -1, createdAt: -1 });
    } else if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Post.countDocuments(filter);

    query = query.skip(startIndex).limit(limit);

    const posts = await query;

    const pagination = {};
    if (endIndex < total) pagination.next = { page: page + 1, limit };
    if (startIndex > 0) pagination.prev = { page: page - 1, limit };

    res.status(200).json({
      success: true,
      count: posts.length,
      pagination,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name');

    if (!post) {
      return next(new ErrorResponse(`Post not found with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res, next) => {
  try {
    const { title, body, tags, community } = req.body;

    const post = await Post.create({
      title,
      body,
      tags,
      community,
      author: req.user.id,
    });

    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse(`Post not found with ID: ${req.params.id}`, 404));
    }

    if (post.author.toString() !== req.user.id) {
      return next(new ErrorResponse('Not authorized to update this post', 403));
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new ErrorResponse(`Post not found with ID: ${req.params.id}`, 404));
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse('Not authorized to delete this post', 403));
    }

    await post.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Upvote a post
// @route   POST /api/posts/:id/upvote
// @access  Private
export const upvotePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return next(new ErrorResponse('Post not found', 404));

    // Remove downvote if exists
    post.downvotes = post.downvotes.filter(
      (userId) => userId.toString() !== req.user.id
    );

    // Toggle upvote
    const hasUpvoted = post.upvotes.some(
      (userId) => userId.toString() === req.user.id
    );

    if (hasUpvoted) {
      post.upvotes = post.upvotes.filter(
        (userId) => userId.toString() !== req.user.id
      );
    } else {
      post.upvotes.push(req.user.id);
    }

    post.upvoteCount = post.upvotes.length;
    await post.save();

    res.status(200).json({
      success: true,
      upvotes: post.upvotes.length,
      downvotes: post.downvotes.length,
      upvoteCount: post.upvoteCount,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Downvote a post
// @route   POST /api/posts/:id/downvote
// @access  Private
export const downvotePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return next(new ErrorResponse('Post not found', 404));

    // Remove upvote if exists
    post.upvotes = post.upvotes.filter(
      (userId) => userId.toString() !== req.user.id
    );

    // Toggle downvote
    const hasDownvoted = post.downvotes.some(
      (userId) => userId.toString() === req.user.id
    );

    if (hasDownvoted) {
      post.downvotes = post.downvotes.filter(
        (userId) => userId.toString() !== req.user.id
      );
    } else {
      post.downvotes.push(req.user.id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      upvotes: post.upvotes.length,
      downvotes: post.downvotes.length,
    });
  } catch (err) {
    next(err);
  }
};
