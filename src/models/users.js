const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    nameLogin: {
      type: String,
      required: true,
      //match: [/^[A-Za-z]+$/, "Character not valid"],
    },
    username: {
      type: String,
      required: true,
      //match: [/^[A-Za-z]+$/, "Character not valid"],
    },
    email: {
      type: String,
      required: true,
      //unique: true,
      //match: [/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, "Email not valid"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    statics: {
      encryptPassword: async (password) => {
        const salt = await bcrypt.genSalt(15); //cifra
        return await bcrypt.hash(password, salt);
      },
      isValidPassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
      },
      createToken: async (payload) => {
        const token = process.env.JWT_SIGN;
        return jwt.sign(payload, token, { expiresIn: "2d" });
      },
    },
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
