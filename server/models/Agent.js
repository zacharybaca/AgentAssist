// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const agentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "manager", "supervisor", "agent"],
    default: "agent",
    required: true,
  },
  avatar: { type: String },
});

// Hash password before saving
agentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
agentSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
