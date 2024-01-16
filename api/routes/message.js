import express from "express";
import { messageModel } from "../schema/message.js";
const messageRoutes = express.Router();
import { protect } from "../middlewares/authMiddleware.js";
import {
  handleGetMessages,
  handleMessageSend,
  deleteMessage,
} from "../controllers/messageControllers.js";

messageRoutes.get("/:chatId", handleGetMessages);
messageRoutes.post("/:chatId", protect, handleMessageSend);
messageRoutes.delete("/message/delete", protect, deleteMessage);

export default messageRoutes;
