import mongoose, { Schema } from "mongoose";
const chatSchema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },

}, { timestamps: true });

export const chatModel = mongoose.model("chat", chatSchema);