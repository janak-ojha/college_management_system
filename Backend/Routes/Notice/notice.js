const  router = require("express").Router();
const Notice = require("../../Model/Notice");
const {jwtProject} = require("../../Middleware/authMiddleware");


router.post("/setnotice",jwtProject, async(req,res) => {
    let {collegeid} = req.body;
    try {
        let collegename = collegeid;
        let noticee = new Notice({
      ...req.body,
      collegename:collegename,
    })
    let result = await noticee.save();
    res.status(200).json("send successfully")
    } catch (error) {
        res.status(400).json(error)
    }
    
    
});

router.get("/getnotice/:collegename",jwtProject,async(req,res) =>{
    try{
        let {collegename} = req.params;
        let result = await Notice.find({collegename}).sort({createdAt: -1});
        res.status(200).json(result)
    }catch(error){
        res.status(400).json(error)
    }
});

module.exports = router;