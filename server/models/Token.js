const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
  jti: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true }, // For automatic cleanup
});

blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // MongoDB TTL index

module.exports = mongoose.model("BlacklistedToken", blacklistedTokenSchema);
