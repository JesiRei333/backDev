require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./src/routes/users");

const mongoDB = require("./src/db/db");
const port = process.env.PORT;
const postRoutes = require("./src/routes/post");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "API Kodemia repaso gen 31" });
});

app.use("/users", userRoutes);
app.use("/post", postRoutes);

mongoDB.connect
  .then((message) => {
    console.log(message);

    app.listen(port, () => {
      console.log("server is ready in port: " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
