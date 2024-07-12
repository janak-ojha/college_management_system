const Teacher = require("../../Model/Teacher");
const router = require("express").Router();
const {jwtProject} = require("../../Middleware/authMiddleware");
 
//get all teacher

router.get("/getteachers",jwtProject,async(req,res) =>{
    try{
        let result = await Teacher.find({collegename:req.user._id});
    }
})