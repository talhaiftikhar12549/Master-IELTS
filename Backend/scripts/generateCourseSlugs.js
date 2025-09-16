import "../config.js"
import mongoose from "mongoose";
import Course from "../models/Course.js";
import { slugify } from "../utils/slugify.js";

const migrateCourseSlugs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const courses = await Course.find({ slug: { $exists: false } });

    for (let course of courses) {
      course.slug = slugify(course.title);
      await course.save();
      console.log(`✅ Updated course: ${course.title} → ${course.slug}`);
    }

    console.log("🎉 Course slugs migration completed!");
    process.exit();
  } catch (err) {
    console.error("❌ Error updating course slugs:", err);
    process.exit(1);
  }
};

migrateCourseSlugs();
