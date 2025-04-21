import express from "express";
import {
  getAllAgents,
  getAgentById,
  createAgent,
  uploadAgentAvatar,
  updateAgent,
  deleteAgent,
} from "../controllers/agentController.js";

import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Admin-only Accessible Routes
router.get("/", authenticateToken, requireAdmin, getAllAgents);
router.get("/:id", authenticateToken, requireAdmin, getAgentById);
router.post("/", authenticateToken, requireAdmin, createAgent);
router.post(
  "/upload-avatar",
  authenticateToken,
  requireAdmin,
  uploadAgentAvatar
);
router.put("/:id", authenticateToken, requireAdmin, updateAgent);
router.delete("/:id", authenticateToken, requireAdmin, deleteAgent);

export default router;
