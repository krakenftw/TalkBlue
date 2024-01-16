import express from "express";
import { userModel } from "../schema/user.js";
import bcrypt from 'bcrypt'
import { loginHandle, registerHandle, userSearchHandle } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/login", loginHandle)
userRoutes.post("/register", registerHandle)
userRoutes.get("/search", protect, userSearchHandle);
export default userRoutes;