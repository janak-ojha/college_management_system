const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        default: '',
    },
    year: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    collegename: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model("Course", courseSchema);
