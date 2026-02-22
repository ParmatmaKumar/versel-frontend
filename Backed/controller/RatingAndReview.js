const mongoose = require("mongoose");
const RatingAndReview = require("../model/RatingAndReview");
const Course = require("../model/Course");
const User = require("../model/User");

// create rating

exports.createRating = async (req, res) => {
    try {
        // get rating, review, courseId and userId
        const { rating, review, courseId } = req.body;
        const userId = req.user.id;
        
        // Validation
        if (!rating || !review || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Rating, review, and courseId are required",
            });
        }
        
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5",
            });
        }
        
        // check if user is enrolled in the course or not
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: userId
        });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Student Not enrolled in the course: ${courseId}`,
            });
        }

        // check if user has already given review
        const existingReview = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "User has already given review for this course",
            });
        }
        // create rating and review
        const newRatingAndReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            course: courseId,
        });

        // Update Course rating and review to course
        await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: { ratingAndReviews: newRatingAndReview._id },
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            data: newRatingAndReview,
        });

    } catch (error) {
        console.error("createRating error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create rating and review",
            error: error.message,
        });
    }
};

// get average rating of course
exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.query || req.body;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }
        // aggregate function to calculate average rating
        const result = await RatingAndReview.aggregate([
            { 
                $match: 
                { course: new mongoose.Types.ObjectId(courseId) }
             },
            { 
                $group: { 
                    _id: "$course",
                    averageRating: { $avg: "$rating" } 
                } 
            }
        ]);
        // return average rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });

        } 
    
        return res.status(200).json({
            success: true,
            message: "Average rating is 0 , no rating given till now ",
            averageRating: 0,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch average rating",
            error: error.message,
        });
    }
};

// getAllRating
exports.getAllRating = async (req, res) => {
    try {
        const { courseId } = req.query || req.body;
        const query = courseId ? { course: courseId } : {};
        const allRatings = await RatingAndReview.find(query)
        .sort({rating:"desc"})
        .populate({
            path: "user",
            select: "firstName lastName email image"
        })
        .populate({
            path: "course",
            select: "courseName"
        })
        .exec();

        return res.status(200).json({   
            success: true,
            message: "All Ratings fetched successfully",
            data: allRatings,
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all ratings",
            error: error.message,
        });
    }

};

