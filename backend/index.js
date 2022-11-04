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
const jpy = require("./src/Controllers/JPY/jpy")
const SD = require("./src/Controllers/standardDeviation");
const rrVaR = require("./src/Controllers/relativeReturnVaR");
const VaR = require("./src/Controllers/VaR");
const rorUSD = require("./src/Controllers/USD/saveRoRUsd");
const rorGBP = require("./src/Controllers/GBP/saveRorGpb");
const rorCHF = require("./src/Controllers/CHF/saveRORChf");
const rorEUR = require("./src/Controllers/EUR/saveRoREur");
const jpyPLN = require("./src/Controllers/JPY/saveToDbJpypln");
const rorJPY = require("./src/Controllers/JPY/saveRoRJpy");

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
app.use(jpy)
app.use(SD);
app.use(rrVaR)
app.use(VaR)
app.get("/", (req, res)=>{
    res.send("hello world");
})

jpyPLN();
usdPLN();
gbpPLN();
chfPLN();
eurPLN();
rorJPY();
rorUSD();
rorGBP();
rorCHF();
rorEUR();

console.log(process.env.JWTKEY);
app.use(bodyParser.json());
app.listen(PORT, function() {
  connect();
    console.log("Server is running on Port");
    
});