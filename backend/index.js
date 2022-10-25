const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8080;
const User = require("./src/Routes/user")
const EurPln = require("./src/Routes/user");
const eurPLN = require("./src/Routes/eurpln");

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
app.use(EurPln);
app.get("/", (req, res)=>{
    res.send("hello world");
})
eurPLN();

console.log(process.env.JWTKEY);
app.use(bodyParser.json());
app.listen(PORT, function() {
  connect();
    console.log("Server is running on Port");
    
});