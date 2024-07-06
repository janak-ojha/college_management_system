
const Course = require('../../Model/Course');
const router = require("express").Router();
const {jwtProject} = require("../../Middleware/authMiddleware");

//adding course
router.post("/addcourse",jwtProject,async(req,res) =>{
    try{
        let{ course,branch,year,semester,section} = req.body;
        let collegename = req.user.id;
        const query = {
            course: { $regex: course, $options: 'i'},
            branch: { $regex: branch, $options: 'i'},
            year: {$regex: year, $option: "i"},
            semester:semester,
            section: {$regex: section,$option: "i"},
            collegename:collegename,
        };
        const alreadyExist = await Course.findOne(query)
        if(alreadyExist){
            res.json({message:"Course already exist"});
        }
        else{
            const newCourse = new Course({
                course,
                branch,
                year,
                semester,
                section,
                collegename:req.user.id,
            });

            const result = await newCourse.save();
            res.status(300).json(result);
        }

    }
    catch(error){
        res.status(500).json({message:"internal server Error "})

    }
});

//getting the course
 router.get("/getcourses",jwtProject,async(req,res) =>{
    try{
        const result= await Course.find({collegename:req.user.id});
        res.status(200).send(result);
    }
    catch(error)
    {
        res.status(500).send({message:"internal server error"});
    }
 });

 //del one course
 router.put("/deleteone",jwtProject,async(req,res) =>{
    try{
        const requestBody = req.body;
        await Course.deleteOne({_id:requestBody.selectedId});
        let result = await Course.find({collegename:req.user.id});
        res.status(200).send(result);
    }
    catch(error)
    {
        res.status(500).send({message:"internal Server Error"});
    }
 })

module.exports= router;
