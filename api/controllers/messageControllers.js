import { chatModel } from "../schema/chats.js";
import { messageModel } from "../schema/message.js";

export const handleGetMessages = async (req, res) => {
  const { chatId } = req.params;
  if (!chatId) {
    return res.status(400).json({ error: "No chat Id Provided" });
  }
  try {
    const messages = await messageModel
      .find({ chat: req.params.chatId })
      .populate("sender", "-password");
    res.json(messages);
  } catch (err) {
    console.log("Error fetching messages:", err);
    res.status(301).json({ err });
  }
};
export const handleMessageSend = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.status(402).json({ error: "all fields required." });
  }
  try {
    const stored = new messageModel({
      content,
      sender: req.user,
      chat: chatId,
    });
    const result = await stored.save();
    const populatedResult = await result.populate("chat");
    res.json(populatedResult);
  } catch (err) {
    console.log(err);
    res.status(402).json({ error: err });
  }
};
export const deleteMessage = async (req, res) => {
  const { messageId, chatId } = req.body;

  if (!messageId || !chatId) {
    return res.status(402).json({ error: "all fields required." });
  }
  try {
    await messageModel.findByIdAndDelete(messageId);

    const newMessages = await messageModel
      .find({ chat: chatId })
      .populate("sender", "-password");
    res.json(newMessages);
  } catch (e) {
    console.log(e);
    res.status(402).json({ error: e });
  }
};
