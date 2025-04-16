import express from "express";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

import { authenticateToken, requireAdmin } from "../middleware/auth.js"; // ✅ Use ES module import style

const router = express.Router();

// Public Routes (no auth needed)
router.get("/", getAllArticles);
router.get("/:id", getArticleById);

// Admin-only Routes
router.post("/", authenticateToken, requireAdmin, createArticle);
router.put("/:id", authenticateToken, requireAdmin, updateArticle);
router.delete("/:id", authenticateToken, requireAdmin, deleteArticle);

export default router;
