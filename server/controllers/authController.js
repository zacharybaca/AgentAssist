import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin already exists (optional safeguard)
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.status(403).json({ message: "Admin account already exists." });
    }

    const newUser = new User({ username, password, role: "admin" });
    await newUser.save();

    res.status(201).json({ message: "Admin account created successfully." });
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ message: "Server error while registering admin." });
  }
};

export const loginAdmin = async (req, res) => {
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
