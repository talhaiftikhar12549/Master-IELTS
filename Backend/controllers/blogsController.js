import Blog from "../models/Blogs.js";
import ErrorResponse from "../utils/errorResponse.js";
import { v2 as cloudinary } from "cloudinary";
import slugify from 'slugify';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export const getAllBlogs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
      tags,
      categories,
      status,
      search,
    } = req.query;

    const queryObj = {};

    if (status) queryObj.status = status;

    if (tags) {
      queryObj.tags = { $in: tags.split(",").map((tag) => tag.trim()) };
    }

    if (categories) {
      queryObj.categories = {
        $in: categories.split(",").map((cat) => cat.trim()),
      };
    }

    if (search) {
      queryObj.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Blog.countDocuments(queryObj);

    const blogs = await Blog.find(queryObj)
      .sort(sort.split(",").join(" "))
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "name email");

    const pagination = {};
    if (skip + blogs.length < total) {
      pagination.next = { page: parseInt(page) + 1, limit: parseInt(limit) };
    }
    if (skip > 0) {
      pagination.prev = { page: parseInt(page) - 1, limit: parseInt(limit) };
    }

    res.status(200).json({
      success: true,
      count: blogs.length,
      pagination,
      data: blogs,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single blog post
// @route   GET /api/blogs/:idOrSlug
// @access  Public
export const getSingleBlog = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const blog = await Blog.findOne(
      idOrSlug.match(/^[0-9a-fA-F]{24}$/)
        ? { _id: idOrSlug }
        : { slug: idOrSlug }
    ).populate("author", "name email");

    if (!blog) return next(new ErrorResponse("Blog not found", 404));

    blog.views += 1;
    await blog.save();

    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private
export const createBlog = async (req, res, next) => {
  try {
    let featuredImage = "";
    let featuredImageId = "";

    if (req.file) {
      featuredImage = req.file.path; // Cloudinary URL
      featuredImageId = req.file.filename; // Cloudinary public_id
    }

       // Auto-generate slug from title if not provided
    let slug = req.body.slug;
    if (!slug && req.body.title) {
      slug = slugify(req.body.title, { lower: true, strict: true });
    }

    const blog = await Blog.create({
      ...req.body,
      slug,
      featuredImage,
      featuredImageId,
      author: req.user.id,
    });

    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:idOrSlug
// @access  Private
export const updateBlog = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    let blog = await Blog.findOne(
      idOrSlug.match(/^[0-9a-fA-F]{24}$/)
        ? { _id: idOrSlug }
        : { slug: idOrSlug }
    ).populate("author", "name email");

    if (!blog) return next(new ErrorResponse("Blog not found", 404));

    if (req.file) {
      // delete old image from cloudinary if exists
      if (blog.featuredImageId) {
        await cloudinary.uploader.destroy(blog.featuredImageId);
      }

      req.body.featuredImage = req.file.path;
      req.body.featuredImageId = req.file.filename;
    }

    blog = await Blog.findByIdAndUpdate(blog._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:idOrSlug
// @access  Private
export const deleteBlog = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const blog = await Blog.findOne(
      idOrSlug.match(/^[0-9a-fA-F]{24}$/)
        ? { _id: idOrSlug }
        : { slug: idOrSlug }
    ).populate("author", "name email");

    if (!blog) return next(new ErrorResponse("Blog not found", 404));

    // remove from Cloudinary
    if (blog.featuredImageId) {
      await cloudinary.uploader.destroy(blog.featuredImageId);
    }

    await blog.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
