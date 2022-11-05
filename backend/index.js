const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8080;
const User = require("./src/Controllers/user");
const usdPLN = require("./src/Controllers/USD/saveToDbUsdpln");
const gbpPLN = require("./src/Controllers/GBP/saveToDbGbppln");
const chfPLN = require("./src/Controllers/CHF/saveToDbChfpln");
const eurPLN = require("./src/Controllers/EUR/saveToDbEurpln");
const euro = require("./src/Controllers/EUR/euro");
const chf = require("./src/Controllers/CHF/chf");
const usd = require("./src/Controllers/USD/usd");
const gbp = require("./src/Controllers/GBP/gbp");
const jpy = require("./src/Controllers/JPY/jpy");
const SD = require("./src/Controllers/standardDeviation");
const rrVaR = require("./src/Controllers/relativeReturnVaR");
const VaR = require("./src/Controllers/VaR");
const jpyPLN = require("./src/Controllers/JPY/saveToDbJpypln");

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
app.use(User);
app.use(euro);
app.use(chf);
app.use(usd);
app.use(gbp);
app.use(jpy);
app.use(SD);
app.use(rrVaR);
app.use(VaR);
app.use(jpyPLN);
app.use(usdPLN);
app.use(gbpPLN);
app.use(chfPLN);
app.use(eurPLN);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(bodyParser.json());
app.listen(PORT, function () {
  connect();
  console.log("Server is running on Port");
});
