const mongoose = require("mongoose");
const Category = require("./Category");
const courseSchema = mongoose.Schema({

    courseName: {
        type: String,
        required: true,
        trim: true
    },
    courseDescription: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    whatYouWillLearn: {
        type: String,

    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],

    thumbnail: {
        type: String,
        required: true,
    }
    ,
    price: {
        type: Number,
        required: true,
        trim: true
    },
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }],
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    tag: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
    }
    ,
    status: {
        type: String,
        enum: ["Draft", "Published"],

    },
    createdAt:{
        type:Date,
		default:Date.now,
    }
    

})
module.exports = mongoose.model("Course", courseSchema)