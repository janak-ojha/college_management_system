const Teacher = require("../../Model/Teacher");
const router = require("express").Router();
const {jwtProject} = require("../../Middleware/authMiddleware");
 
//get all teacher

router.get("/getteachers",jwtProject,async(req,res) =>{
    try{
        let result = await Teacher.find({collegename:req.user.id});
        console.log(result);
        result = await Teacher.populate(result,"course");
        res.status(200).send(result);
       
    } catch(error)
    {
        res.status(500).send({message:"Internal Server Error"});
    }
});

// del all teacher

router.put("/deleteAll",jwtProject,async(req,res) =>{
    try{
        await Teacher.deleteMany({collegename:req.user.id});
        let result = await Teacher.find({collegename:req.user.id})
        res.status(200).send(result)
    }catch(error)
    {
        res.status(500).send({message:"Internal Server Error"});
    }
});

//del one teacher

router.put("/deleteOne",jwtProject,async(req,res)=>{
    try{
        const requestBody = req.body;
        await Teacher.deleteOne({_id:requestBody.selectedId})
        let result = await Teacher.find({collegename:req.user.id});
        result = await Teacher.populate(result,"course");
        res.status(200).send(result);
    } catch(error) {
        res.status(500).send({message:"Internal Server Error"});
    }
})

module.exports = router;