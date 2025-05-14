import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

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
