const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8080;
const User = require("./src/Routes/user")
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
    res.send("Działasz?");
})
app.use(bodyParser.json());
app.listen(PORT, function() {
  connect();
    console.log("Server is running on Port");
    console.log(process.env.JWTKEY);
});