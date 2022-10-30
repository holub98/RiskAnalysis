const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8080;
const User = require("./src/Controllers/user")
const usdPLN = require("./src/Controllers/USD/saveToDbUsdpln");
const gbpPLN = require("./src/Controllers/GBP/saveToDbGbppln");
const chfPLN = require("./src/Controllers/CHF/saveToDbChfpln");
const eurPLN = require("./src/Controllers/EUR/saveToDbEurpln");
const euro = require("./src/Controllers/EUR/euro")
const chf = require("./src/Controllers/CHF/chf")
const usd = require("./src/Controllers/USD/usd")
const gbp = require("./src/Controllers/GBP/gbp")

dotenv.config();
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const connect = async() => { mongoose.connect(process.env.MONGO_uri, connectionParams);}

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
app.get("/", (req, res)=>{
    res.send("hello world");
})


usdPLN();
gbpPLN();
chfPLN();
eurPLN();

console.log(process.env.JWTKEY);
app.use(bodyParser.json());
app.listen(PORT, function() {
  connect();
    console.log("Server is running on Port");
    
});