import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// read the token from the req
export const authMiddleware = async (req, res, next) => {
  console.log("auth middleware reached");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; //["bearer",token]
  } else if (req.cookies?.jwt) {
    token = res.cookies.jwt;
  }
  if (!token) {
    return res.status(401).json({
      error: "Not authorized, no token provided",
    });
  }

  try {
    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(401).json({
        error: "User no longer exists",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Not authorized, token failed",
    });
  }
};
