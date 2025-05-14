import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const { phoneNumber, favoriteArticles, avatar } = req.body; // Optional fields

    // Check if user already exists (username and email should be unique)
    const existingUserWithUsername = await User.findOne({ username });
    if (existingUserWithUsername) {
      return res.status(403).json({ message: "Username already exists." });
    }

    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      return res.status(403).json({ message: "Email already exists." });
    }

    // Check for the presence of required fields
    if (!name || !username || !email || !password || !role) {
      return res.status(400).json({ message: "Please provide values for all required fields: name, username, email, password, and role." });
    }

    const newUser = new User({
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
      { userId: user._id, username: user.username, role: user.role },
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

export const logout = async (req, res) => {
  const token = localStorage.getItem("token");

  if (!token) return res.status(500).json({ message: "There is no current user logged-in  "});

  res.status(204);
};
