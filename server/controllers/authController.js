import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, username, email, password, role, favoriteArticles, avatar } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: "Account already exists." });
    }

    const newUser = new User({ name, username, email, password, role, favoriteArticles, avatar });

    if (!name || !username || !email || !password || !role) {
      return res.status(403).json({ message: "Please provide required data for all required fields"});
    }
    
    await newUser.save();

    res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    console.error("Error creating account:", err);
    res.status(500).json({ message: "Server error while registering account." });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    // Sign JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET,
      { expiresIn: "8h" }
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
