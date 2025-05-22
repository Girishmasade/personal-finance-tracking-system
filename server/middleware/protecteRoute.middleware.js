import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    
    // console.log(token);
    
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decodeToken);
    

    req.user = await User.findById(decodeToken.id).select("-password");
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
