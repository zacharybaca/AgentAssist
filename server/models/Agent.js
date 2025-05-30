// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
  },
  phoneNumber: {
    type: String,
    required: false,
    validate: {
      validator: (value) => {
        if (!value) return true;
        return validator.isMobilePhone(value, "en-US");
      },
      message: "Please enter a valid mobile phone number",
    },
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "manager", "supervisor", "agent"],
    default: "agent",
    required: true,
  },
  favoriteArticles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
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
