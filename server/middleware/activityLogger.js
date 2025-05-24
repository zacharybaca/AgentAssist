const ActivityLog = require("../models/ActivityLog");

async function activityLogger(req, res, next) {
  const userId = req.auth?.userId;
  const jti = req.auth?.jti;

  if (userId && jti) {
    await ActivityLog.create({
      userId,
      jti,
      method: req.method,
      endpoint: req.originalUrl,
      timestamp: new Date(),
    });
  }

  next();
}

module.exports = activityLogger;
