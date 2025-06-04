import Agent from "../models/Agent.js";
import jwt from "jsonwebtoken";
const BlacklistedToken = require("../models/Token.js");
const ActivityLog = require("../models/ActivityLog.js");
const { v4: uuidv4 } = require("uuid");

export const register = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const { phoneNumber, favoriteArticles, avatar } = req.body; // Optional fields

    // Check if user already exists (username and email should be unique)
    const existingUserWithUsername = await Agent.findOne({ username });
    if (existingUserWithUsername) {
      return res.status(403).json({ message: "Username already exists." });
    }

    const existingUserWithEmail = await Agent.findOne({ email });
    if (existingUserWithEmail) {
      return res.status(403).json({ message: "Email already exists." });
    }

    // Check for the presence of required fields
    if (!name || !username || !email || !password || !role) {
      return res.status(400).json({
        message:
          "Please provide values for all required fields: name, username, email, password, and role.",
      });
    }

    const newUser = new Agent({
      name,
      username,
      email,
      password,
      role,
      // Only include optional fields if they are present in the request body
      ...(phoneNumber !== undefined && { phoneNumber }),
      ...(favoriteArticles !== undefined && { favoriteArticles }),
      ...(avatar !== undefined && { avatar }),
    });

    await newUser.save();

    res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    console.error("Error creating account:", err);
    res
      .status(500)
      .json({ message: "Server error while registering account." });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const user = await Agent.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    // Sign JWT
    // Instead of `userId`, you could use `_id` if you prefer shorter access
    const token = jwt.sign(
      { _id: user._id, username: user.username, role: user.role },
        process.env.SECRET,
      { algorithm: "HS256", expiresIn: "1h", jwtid: uuidv4() }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};

export const logout = async (req, res) => {
  const token = localStorage.getItem("token");

  if (!token) return res.status(204);

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    await BlacklistedToken.create({
      jti: decoded.jti,
      expiresAt: new Date(decoded.exp * 1000), // Save expiry for TTL cleanup
    });

    const activityLogs = await ActivityLog.find({ jti }).sort({ timestamp: 1 });

    res.status(200).json({
      message: "Logged out successfully",
      activityLog: activityLogs,
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }

  res.status(200).json({ message: "You have successfully been logged out." });
};
