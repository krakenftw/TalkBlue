import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: true, default: "https://rugby.vlaanderen/wp-content/uploads/2018/03/Anonymous-Profile-pic.jpg" },


}, { timestamps: true });
export const userModel = mongoose.model("users", userSchema);