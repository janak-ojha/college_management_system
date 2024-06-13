const express = require("express");
const dotenv = require("dotenv");
const cors =require("cors");
const mongoose =require("mongoose");
const app =express();
const port = process.env.PORT || 5000


dotenv.config();
app.use(express.json({limit:"10mb"}));
app.use(cors());

mongoose
.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to Mongodb"))
.catch((err)=> console.log("not connected to  network",err));


