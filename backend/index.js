const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8080;
const User = require("./src/Routes/user")
// const usdPLN = require("./src/Routes/usdpln");
// const gbpPLN = require("./src/Routes/gbppln");
// const eurPLN = require("./src/Routes/chfpln");
const chfPLN = require("./src/Routes/eurpln");

const axios = require('axios');
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
app.get("/", (req, res)=>{
    res.send("hello world");
})


// usdPLN();
// gbpPLN();
chfPLN();
// eurPLN();

console.log(process.env.JWTKEY);
app.use(bodyParser.json());
app.listen(PORT, function() {
  connect();
    console.log("Server is running on Port");
    
});