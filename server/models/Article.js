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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
