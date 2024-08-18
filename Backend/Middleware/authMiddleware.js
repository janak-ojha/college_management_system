const jwt = require("jsonwebtoken");
const Admin = require("../Model/Admin");
const Teacher = require("../Model/Teacher");
const Student = require("../Model/Student");
const { request } = require("express");

const jwtProject = async(req,res,next) => {
    let token;
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await Admin.findById(decoded.id).select("-password");
            req.userT = await Teacher.findById(decoded.id).select("-password");
            req.userSt = await Student.findById(decoded.id).select("-password");
            next();
        }
        catch(error){
            return res.status(401).json({error:"Not authorized,token failed"});
        }
    }
    if(!token)
        {
            return res.status(401).json({error: "Not authorized,no token"})
        }
} ;

module.exports ={jwtProject}
