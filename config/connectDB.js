const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
  mongoose
    .connect(config.get("MONGOURI"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("mongoose is connected"))
    .catch(() => console.log("erreur DB"));
};

module.exports = connectDB;