const Course = require('../../Model/Course');
const router = require("express").Router();
const { jwtProject } = require("../../Middleware/authMiddleware");

// Adding course
router.post("/addcourse", jwtProject, async (req, res) => {
    try {
        const { course, branch, year, semester, section } = req.body;
        const collegename = req.user.id;
        
        const query = {
            course: { $regex: course, $options: 'i' },
            branch: { $regex: branch, $options: 'i' },
            year: { $regex: year, $options: "i" },
            semester,
            section: { $regex: section, $options: "i" },
            collegename: collegename,
        };

        const alreadyExist = await Course.findOne(query);
        if (alreadyExist) {
            return res.json({ message: "Course already exists" });
        } else {
            const newCourse = new Course({
                course,
                branch,
                year,
                semester,
                section,
                collegename,
            });

            const result = await newCourse.save();          
            return res.status(200).json(result);
            
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Getting the courses
router.get("/getcourses", jwtProject, async (req, res) => {
    try {
        const result = await Course.find({ collegename: req.user.id });
        return res.status(200).send(result);
       
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

// Delete one course
// deleting one course
router.put("/deleteOne",jwtProject,async(req,res) => {
    try {
        const requestBody = req.body;
        await Course.deleteOne({_id:requestBody.selectedId})
        let result = await Course.find({collegename:req.user.id});
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
      }
}) 


module.exports = router;