// models/Article.js
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // <-- reference by model name
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  coverImage: {
    url: String,
    public_id: String,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  favoritedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
