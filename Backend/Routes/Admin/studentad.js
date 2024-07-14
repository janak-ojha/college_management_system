const student = require("../../Model/Student");
const router = require("express").Router();
const {jwtProject} = require("../../Middleware/authMiddleware");
const Student = require("../../Model/Student");

router.get("/getstudents",jwtProject,async(req,res) =>{
    try{
        const result = await Student.find({collegename: req.user.id});
        res.status(200).send(result);    

    }catch(err)
    {
        res.status(500).send({message:"internal server error"});
    }
});


//delete all student
router.put("/deleteAll",jwtProject,async(req,res) =>{
    try{
        await Student.deleteMany({collegename:req.user.id});
        let result = await Student.find({collegename:req.user.id});
        res.status(200).send(result);
    }catch(err){
       res.status(500).send({message:"Internal Server Error"});
    }
});

//delete one student
router.put("/deleteOne",jwtProject,async(req,res) =>{
    try{
        const requestBody = req.body;
        await Student.deleteOne({_id:requestBody.selectedId})
        let result = await Student.find({collegename:req.user.id});
        res.status(200).send(result);
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
});

//student of perticular course qithout using id

router.post("/singlecoursestudentlist",jwtProject,async(req,res)=>{
    try{
        let{course,branch,year,semester,section,collegename} = req.body;
        semester = semester.toString();
        console.log(course,branch,year,semester,section,collegename);
      
        if(collegename === null || collegename === undefined){
            collegename= req.user.id
        }
      
        const query = {
            $and: [
                {course: {$regex: course,$options:"i"}},
                {branch: {$regex: branch,$options:"i"}},
                {year: {$regex: year,$options:"i"}},
                {semester: {$regex: semester,$options:"i"}},
                {section: {$regex: section,$options:"i"}},
            ],
            collegename:collegename
        };
        let result = await Student.find(query);
        res.status(200).send(result);
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
})

module.exports = router;

