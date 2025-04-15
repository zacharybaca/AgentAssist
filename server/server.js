import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import articleRouter from "./routes/articleRouter.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/articles", articleRouter);

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
