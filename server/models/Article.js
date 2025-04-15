import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
