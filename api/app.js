import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import messageRoutes from "./routes/message.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import userRoutes from "./routes/user.js";
import { chatRoutes } from "./routes/chat.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? "https://talkblue-client-production.up.railway.app"
        : "http://localhost:5173",

    methods: ["GET", "POST"],
  },
  allowEIO3: true,
});

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://talkblue-client-production.up.railway.app"
        : "http://localhost:5173",
    credentials: true,
  }),
);

dotenv.config();

app.use("/api/", messageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", (socket) => {
  socket.on("new-message", (data) => {
    io.to(data.chat._id).emit("message-received", data);
  });

  socket.on("join-chat", (room) => {
    console.log("user joined room");
    socket.join(room);
  });
  socket.on("userTyping", (room) => {
    socket.to(room).emit("SomeOneTyping");
  });

  socket.on("userDeletedMessage", (room) => {
    socket.to(room._id).emit("message-deleted");
  });
});

mongoose.connect(process.env.MONGO_URI);

const port = process.env.PORT || 3500;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
