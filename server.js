const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");

app.use(express.json());
connectDB();

app.use("/persons", require("./routes/person"));

app.listen(3000, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("server is running on port 3000");
  }
});
