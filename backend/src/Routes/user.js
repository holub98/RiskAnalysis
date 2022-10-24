const express = require("express");
const userModel = require("../Models/user");
const app = express();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
app.post("/signUp", async(req, res)=>{
  try{ const salt = await bcrypt.genSalt(Number(10));
    const hash = await bcrypt.hash(req.body.password, salt)
  const user = new userModel({...req.body, password: hash});
    
      const existUser = await userModel.findOne({email: req.body.email});
      if(existUser){
        return res.status(409).send({message: "User exist with this email"})
      }

        await user.save();
        res.send({firstName: req.body.firstName});
    } catch(error){
        res.status(500);
    }
})

app.post("/login", async (req, res) => {
  try { const user = await userModel.findOne({email: req.body.email});
      if(!user){
        res.status(401).send({message: "Invalid email or password"})
      }
      const correctPassword = await bcrypt.compare(req.body.password, user.password)
      if(!correctPassword){
        res.status(401).send({message: "Invalid email or password"})
      }
      const token = jwt.sign({_id: user._id}, process.env.JWTKEY);
      
      res.status(200).send({data: token,  firstName: req.body.firstName, message: "are you log in"});
    } catch (error) {
      res.status(500).send(error);
    }
  });

  module.exports = app;