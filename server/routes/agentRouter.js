import express from "express";
import {
  getAllAgents,
  getAgentById,
  createAgent,
  uploadAgentAvatar,
  updateAgent,
  deleteAgent,
  toggleFavoriteArticle,
  getUserFavoriteArticles,
} from "../controllers/agentController.js";

import {
  authenticateUser,
  requireAdmin,
  requireAuth,
} from "../middleware/auth.js";

const router = express.Router();

// User Protected Routes
router.put(
  "/favorite-articles/:articleId/toggle",
  requireAuth,
  toggleFavoriteArticle
);
router.get("/favorite-articles/:agentId", requireAuth, getUserFavoriteArticles);

// Admin-only Accessible Routes
router.get("/", authenticateUser, requireAdmin, getAllAgents);
router.get("/:id", authenticateUser, requireAdmin, getAgentById);
router.post("/", authenticateUser, requireAdmin, createAgent);
router.post(
  "/upload-avatar",
  authenticateUser,
  requireAdmin,
  uploadAgentAvatar
);
router.put("/:id", authenticateUser, requireAdmin, updateAgent);
router.delete("/:id", authenticateUser, requireAdmin, deleteAgent);

export default router;
