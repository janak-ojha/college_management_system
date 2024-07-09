const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    rollno:{
        type:String,
        required:true,
    },
    collegename:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    branch:{
        type:String,

    },
    year:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },

},
{
    timestamps:true

},
);

module.exports = mongoose.model("Student",studentSchema);