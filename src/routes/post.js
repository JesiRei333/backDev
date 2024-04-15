const express = require("express");
const router = express.Router();
//const Message = require("../models/message");
//const User = require("../models/users");
const Post = require("../models/post");
const authMiddlewares = require("../middlewares/auth");

router.post("/", async (req, res) => {
  try {
    const post = req.body;
    const newPost = await Post.create(post);
    await newPost.save();
    //TODO create user
    res.status(201).send({ message: "post Creado", data: newPost });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send({ message: "Posts", data: posts });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.send({ message: "Message deleted", data: post });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.send({ message: "Message deleted" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
