const mongoose = require("mongoose");
const URI = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.ituvdfq.mongodb.net/nexDevRep`;

const connect = new Promise(async (resolve, reject) => {
  let conn = await mongoose.connect(URI);

  if (conn) resolve("conexion DB sucess");
  reject("errror conexion DB");
});

module.exports = {
  connect,
};
