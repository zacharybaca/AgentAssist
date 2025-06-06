import Agent from "../models/Agent.js";
const multer = require("multer");

export const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: "Not found" });
    res.status(200).json(agent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAgent = async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    const saved = await newAgent.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const uploadAgentAvatar = async (req, res) => {
  try {
    // Configure storage
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/"); // Ensure this folder exists
      },
      filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      },
    });

    const upload = multer({ storage });

    upload.single("avatar"),
      (req, res) => {
        if (!req.file)
          return res.status(400).json({ message: "No file uploaded" });
        res.json({ avatarUrl: `/uploads/${req.file.filename}` });
      };
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateAgent = async (req, res) => {
  try {
    const updated = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAgent = async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleFavoriteArticle = async (req, res) => {
  try {
    const agentId = req.user._id;
    const articleId = req.params.articleId;

    const agent = await Agent.findById(agentId);

    if (!agent) return res.status(404).json({ message: "Agent not found" });

    const index = agent.favoriteArticles.indexOf(articleId);

    if (index === -1) {
      // Add to favorites
      agent.favoriteArticles.push(articleId);
    } else {
      // Remove from favorites
      agent.favoriteArticles.splice(index, 1);
    }

    const updated = await agent.save();

    await updated.populate("favoriteArticles"); // Populate with full article data

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserFavoriteArticles = async (req, res) => {
  try {
    const agent = await Agent.findById(req.user._id).populate(
      "favoriteArticles"
    );
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    res.status(200).json(agent.favoriteArticles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
