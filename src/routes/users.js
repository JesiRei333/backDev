const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.post("/enter", async (req, res) => {
  try {
    const user = req.body;
    user.password = await User.encryptPassword(user.password);
    const newUser = await User.create(user);
    await newUser.save();
    res.status(201).send({ message: "User created", data: newUser });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }); //busca por correo

    if (!user || !(await User.isValidPassword(password, user.password))) {
      res.status(401).send({ message: "password or email invalid " });
    } else {
      const token = await User.createToken({
        _id: user._id,
        username: user.username,
      });
      res.status(201).send({ message: "Login Success", token: token });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
