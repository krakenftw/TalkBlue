import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    chat: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "chat" }

}, { timestamps: true });

export const messageModel = mongoose.model("messages", messageSchema);