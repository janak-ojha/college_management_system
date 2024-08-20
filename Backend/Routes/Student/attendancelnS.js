const router = require("express").Router();
const Student = require("../../models/Student")
const {jwtProject} = require("../../Middleware/authMiddleware");

router.get("/getattendance/:id", jwtProject, async (req, res) => {  
    try {
      let studentid = req?.userSt?.id;
      let id = req.params.id;
      if(studentid === undefined || studentid === null){
         studentid = id
      } 
      let student1 = await Student.findOne({ _id: studentid });

      if (student1) {
        await student1.populate({ path: "attendance.teacher", select: "subject course" });
        const result = student1.attendance;
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = router;