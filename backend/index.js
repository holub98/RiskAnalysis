const express = require("express");
const app = express();
const PORT = 8080;
const SD = require("./src/Routes/standardDeviation");
const rrVaR = require("./src/Routes/relativeReturnVaR");
const VaR = require("./src/Routes/VaR");
const currency = require("./src/Routes/currency");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
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
app.use(express.json());
app.use("/api/rrVaR", rrVaR);
app.use("/api/var", VaR);
app.use("/api/standard-deviation", SD);
app.use("/api/currency", currency);

let server = app.listen(PORT, function () {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
module.exports = server;
