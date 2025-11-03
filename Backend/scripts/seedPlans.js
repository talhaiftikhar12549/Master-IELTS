import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "../models/Plan.js";

dotenv.config();

const plans = [
  {
    title: "Premium",
    actualPrice: 40,
    discPrice: 30,
    offer: "Special Offer",
    desc: [
      "All features from Standard",
      "Personal Progress tracker",
      "Weekly updated blogs",
      "Access to Q and A section",
      "Access to Community Page",
      "Assignments and Personal Feedback from Expert tutor",
    ],
  },
  {
    title: "Standard",
    actualPrice: 35,
    desc: [
      "Full Access to video content",
      "Mock exams",
      "Personal Progress tracker",
      "Quizzes",
      "Weekly updated blogs",
    ],
  },
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    await Plan.deleteMany();
    await Plan.insertMany(plans);
    console.log("Plans seeded successfully");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });