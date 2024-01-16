import jwt from "jsonwebtoken";
import { userModel } from "../schema/user.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = await userModel
        .findOne({ _id: decoded._id })
        .select("-password");
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "unauthorized" });
    }
  } else {
    return res.status(401).json({ error: "Invalid token." });
  }
};
