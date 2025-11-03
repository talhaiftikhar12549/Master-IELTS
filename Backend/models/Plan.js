import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true }, // "Standard" / "Premium"
    actualPrice: { type: Number, required: true },
    discPrice: { type: Number }, // optional discounted price
    offer: { type: String }, // e.g. "Special Offer"
    desc: [{ type: String }], // array of features
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);

export default Plan;