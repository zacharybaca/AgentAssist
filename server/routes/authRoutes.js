import express from "express";
import { registerAdmin } from "../controllers/authController.js";
import { loginAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;
