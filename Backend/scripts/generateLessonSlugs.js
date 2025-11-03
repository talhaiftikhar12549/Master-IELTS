import "../config.js"
import mongoose from "mongoose";
import Lesson from "../models/Lesson.js";
import { slugify } from "../utils/slugify.js";

const migrateLessonSlugs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const lessons = await Lesson.find({ slug: { $exists: false } });

    for (let lesson of lessons) {
      lesson.slug = slugify(lesson.title);
      await lesson.save();
      console.log(`✅ Updated lesson: ${lesson.title} → ${lesson.slug}`);
    }

    console.log("🎉 Lesson slugs migration completed!");
    process.exit();
  } catch (err) {
    console.error("❌ Error updating lesson slugs:", err);
    process.exit(1);
  }
};

migrateLessonSlugs();
