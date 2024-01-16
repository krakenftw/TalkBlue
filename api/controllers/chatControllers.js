import { chatModel } from "../schema/chats.js"
import { userModel } from "../schema/user.js";
import mongoose from 'mongoose';

export const createChat = async (req, res) => {
    const { userId } = req.body;
    if (userId == req.user._id) {
        return res.status(201).json({ error: "You cannot create chat with yourself." })
    }
    if (!userId) {
        return res.status(401).json({ error: "No user id provided." })
    }
    var isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password")
        .populate("latestMessage");


    isChat = await userModel.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name profilePic email'
    });
    if (isChat.length > 0) {
        res.json(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        };
        try {
            const createdChat = await chatModel.create(chatData);
            const fullChat = await chatModel.findOne({ _id: createdChat._id }).populate("users", "-password")
            res.json(fullChat)
        } catch (err) {
            console.log(err);
            res.status(401).json({ error: "An error occured" });
        }
    }
}

export const groupAdd = async (req, res) => {
    const { userId, groupId } = req.body;
    if (!userId) {
        return res.status(401).json({ error: "No user Id provided" });
    }
    const updatedData = await chatModel.findByIdAndUpdate(groupId, { $push: { users: userId } }, { new: true }).populate("users", "-password")
    res.json(updatedData);
}
export const groupRemove = async (req, res) => {
    const { userId, groupId } = req.body;
    if (!userId) {
        return res.status(401).json({ error: "No user Id provided" });
    }
    const updatedData = await chatModel.findByIdAndUpdate(groupId, { $pull: { users: userId } }, { new: true }).populate("users", "-password")
    res.json(updatedData);
}

export const renameGroup = async (req, res) => {
    const { groupId, name } = req.body;
    if (!groupId) {
        return res.status(401).json({ error: "Group Id required" });
    }

    const group = await chatModel.findOne({ _id: groupId });

    if (group) {
        try {

            const updatedChat = await chatModel.findOneAndUpdate({ _id: groupId }, { chatName: name }, { new: true });
            res.json(updatedChat)
        } catch (err) {
            res.json({ error: "An error occured" });
            console.log(err);
        }
    } else {
        return res.status(401).json({ error: "No group Found" });
    }
}

export const createGroupChat = async (req, res) => {
    const { name, users } = req.body;
    if (!name || !users) {
        return res.status(401).json({ error: "All fields required." })
    }
    if (users.length < 2) {
        return res.status(301).json({ error: "Minimum 2 users required for group chat." })
    }
    users.push(req.user._id)
    const groupData = {
        chatName: name,
        admin: req.user._id,
        isGroupChat: true,
        users: users
    }
    try {
        const createdGroup = await chatModel.create(groupData)
        const getGroupInfo = await chatModel.findOne({ _id: createdGroup._id })
            .populate("users", "-password")
            .populate("admin", "-password")
        res.json(getGroupInfo)
    } catch (err) {
        console.log(err);
    }
}

export const userChats = async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        return res.json({ error: "Not logged in" });
    }
    const chats = await chatModel.find({ users: { $elemMatch: { $eq: userId } } })
        .populate("latestMessage")
        .populate("users", "-password")
        .populate("admin", "-password")
    if (chats.length > 0) {
        return res.json({ chats: chats });
    } else {
        return res.json({ error: "No chats found" })
    }
}