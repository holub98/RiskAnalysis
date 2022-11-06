const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8080;
const SD = require("./src/Routes/standardDeviation");
const rrVaR = require("./src/Routes/relativeReturnVaR");
const VaR = require("./src/Routes/VaR");
const currency = require("./src/Routes/currency");

dotenv.config();
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connect = async () => {
  mongoose.connect(process.env.MONGO_uri, connectionParams);
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(bodyParser.json());

app.use(cors());
app.use("/api/rrVaR", rrVaR);
app.use("/api/var", VaR);
app.use("/api/standard-deviation", SD);
app.use("/api/currency", currency);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, function () {
  connect();
  console.log("Server is running on Port");
});
