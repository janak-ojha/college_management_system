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
//for teacherblock
const attendanceS = require("./Routes/Teacher/Attendance");
const markS = require("./Routes/Teacher/mark");
//studentblock
const attendance= require("./Routes/Student/attendancelnS");
const mark = require("./Routes/Student/marklnS");
const teacherSubjects = require("./Routes/Student/teacherOfperticularCourse");
//for notice
const noticea = require("./Routes/Notice/notice");

app.use("/api/auth",authRoute);
app.use("/api/courses",course);
app.use("/api/students",studenta);
app.use("/api/teachers",teachera);
app.use("/api/notices",noticea);
app.use("/api/attendance",attendanceS);
app.use("/api/mark",markS);
//for student marks
app.use("/api/attendanceofstudent", attendance);
app.use("/api/markofstudent", mark);
app.use("/api/students",teacherSubjects);

app.listen(PORT);


