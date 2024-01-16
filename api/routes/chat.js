import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createChat, createGroupChat, groupAdd, groupRemove, renameGroup, userChats } from '../controllers/chatControllers.js';

export const chatRoutes = express.Router();

chatRoutes.post("/create", protect, createChat);
chatRoutes.get("/get", protect, userChats);
chatRoutes.post("/createGroup", protect, createGroupChat);
chatRoutes.post("/renameGroup", protect, renameGroup);
chatRoutes.post("/groupAdd", protect, groupAdd);
chatRoutes.post("/groupRemove", protect, groupRemove);
