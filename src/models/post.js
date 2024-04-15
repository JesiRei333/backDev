const mongoose = require("mongoose");
//const bcrypt = require ('bcrypt')
//const jwt= require ('jsonwebtoken')

const postSchema = new mongoose.Schema(
  {
    articuloPost: {
      type: String,
      required: true,
    },

    articuloTitulo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//users es la coleccion y userSquema lo que acabamos de crear
const Post = mongoose.model("posts", postSchema); //modelo

module.exports = Post;
