require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");
const BlacklistedToken = require("../models/Token");

export const authenticateUser = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  isRevoked: async (req, token) => {
    if (!token?.jti) return true;

    const blacklisted = await BlacklistedToken.findOne({ jti: token.jti });
    return !!blacklisted;
  },
}).unless({
  path: ["/api/agents/sign-in", "/api/agents/signup"],
});

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") return res.sendStatus(403);
  next();
};

export const requireManager = (req, res, next) => {
  if (req.user?.role !== "manager") return res.sendStatus(403);
  next();
};

export const requireSuperVisor = (req, res, next) => {
  if (req.user?.role !== "supervisor") return res.sendStatus(403);
  next();
};

export const requireAgent = (req, res, next) => {
  if (req.user?.role !== "agent") return res.sendStatus(403);
  next();
};

export const requireAuth = (req, res, next) => {
  const { agentId } = req.params;
  const loggedInUser = req.auth?.userId;

  if (!loggedInUser)
    return res.status(403).json({ error: "No Logged In User Detected" });

  try {
    if (agentId !== loggedInUser.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized access to this agent's data." });
    }
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};
