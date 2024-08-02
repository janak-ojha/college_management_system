const express = require("express");
const dotenv = require("dotenv");
const cors =require("cors");
const mongoose =require("mongoose");
const app =express();
const PORT = process.env.PORT || 5000


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

const authRoute = require ("./Routes/Auth");
const course = require("./Routes/Admin/courses");
const studenta = require("./Routes/Admin/studentad");
const teachera = require("./Routes/Admin/teacherad");
const noticea = require("./Routes/Notice/notice");

app.use("/api/auth",authRoute);
app.use("/api/courses",course);
app.use("/api/students",studenta);
app.use("/api/teachers",teachera);
app.use("/api/notices",noticea);

app.listen(PORT);


