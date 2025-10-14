import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authMiddleware(requiredRole = null) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ message: "Authorization header missing" });

    const token = header.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Token missing" });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload; 
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}