const router = require("express").Router();
const Admin = require("../Model/Admin");
const bcrypt =require("bcrypt");
const TokenGenerate =require("./TokenGenerate");
const {jwtProject} = require("../Middleware/authMiddleware");
const jwt = require("jsonwebtoken");

//authorization for admin
router.post("/registerAdmin",async(req,res) =>{
    const {username,collegename,password,email,profilepp,role} = req.body;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password,salt);
        
        let admin = new Admin({
            username,
            collegename,
            email,
            role,
            password: hashedpass,
            profilepp:
            profilepp || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
        });

        const emailExist = await Admin.findOne({ email });
        const collegeExist = await Admin.findOne({ collegename });

        if(emailExist)
            {
                res.send({message:"Email already Exist"});
            }
        else if(collegeExist)
                {
                    res.send({message:"college name already exist"});
                }
        else{
                admin = await admin.save();
                res.status(200).json({
                    _id: admin._id,
                    username: admin.username,
                    collegename: admin.collegename,
                    email: admin.email,
                    role: admin.role,
                    profilepp: admin.profilepp,
                    token: TokenGenerate(admin._id),
                });
            }    
    }
    catch(error) {
        res.status(500).json(error.message);
    }

});

router.post("/loginAdmin",async(req,res)=>{
    const { password,email} = req.body;
    if(req.body.email && req.body.password)
        {
            let admin = await Admin.findOne({email});
            if(admin){
                const validated = await bcrypt.compare(password,admin.password);
                if(validated){
                    res.send({
                        id: admin._id,
                        username: admin.username,
                        collegename: admin.collegename,
                        email: admin.email,
                        role: admin.role,
                        profilepp: admin.profilepp,
                        token: TokenGenerate(admin._id),
                    });
                }else{
                    res.send({message: "invalid passowrd"});
                }
            }
            else{
                res.send({message:"user not found"});
            }
        }
        else{
            res.send({message:"email and password is required"});
        }
});

module.exports = router;

