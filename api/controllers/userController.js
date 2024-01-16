import express from "express";
import { userModel } from "../schema/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginHandle = async (req, res) => {
  const body = req.body;
  if (!body.username || !body.password) {
    return res.status(400).json({ error: "All fields required." });
  }
  const userData = await userModel.findOne({ username: body.username });
  if (!userData) {
    return res.status(401).json({ error: "No user found." });
  }

  bcrypt.compare(
    body.password,
    userData.password,
    async function (err, result) {
      if (err) {
        return res.status(401).json({ error: "Wrong Password." });
      }
      if (result) {
        delete userData.password;
        const token = await jwt.sign(
          { _id: userData._id, username: userData.username },
          process.env.JWT_KEY,
          { expiresIn: 86400 },
        );

        return res
          .status(200)
          .json({
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            profilePic: userData.profilePic,
            username: userData.username,
            token: token,
          });
      } else {
        return res.status(401).json({ error: "Wrong password." });
      }
    },
  );
};
export const registerHandle = async (req, res) => {
  const { username, password, confirmPass, profilePic, name, email } = req.body;
  if (
    !username ||
    !password ||
    !confirmPass ||
    !profilePic ||
    !email ||
    !name
  ) {
    return res.status(400).json({ error: "All fields required." });
  }
  if (confirmPass != password) {
    return res.status(401).json({ error: "Passwords do not match." });
  }
  const userFound = await userModel.findOne({ username });
  if (userFound) {
    return res.status(401).json({ error: "Username already exists" });
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    email,
    name,
    username,
    password: hashedPass,
    profilePic,
  });
  const savedUser = await newUser.save();
  delete savedUser.password;
  res.json(savedUser).status(200);
};

export const userSearchHandle = async (req, res) => {
  const search = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { name: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await userModel.find(search);
  res.status(200).json(users);
};
