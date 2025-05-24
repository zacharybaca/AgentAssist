import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import articleRouter from "./routes/articleRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import authRouter from "./routes/authRoutes.js";
import agentRouter from "./routes/agentRouter.js";

dotenv.config();
const app = express();
const { authenticateUser } = require("./middleware/auth.js");
const activityLogger = require("./middleware/activityLogger.js");

app.use(cors());
app.use(express.json());
app.use(authenticateUser);
app.use(activityLogger);

// Routes
app.use("/api/articles", articleRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/agents", agentRouter);
app.use("/api/agents/upload-avatar", express.static("uploads"));

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
