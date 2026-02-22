const Profile = require("../model/Profile");
const User = require("../model/User");
const Course = require("../model/Course");
const CourseProgress = require("../model/CoursesProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Convert seconds to human-readable duration (e.g., "2h 30m 15s")
function convertSecondsToDuration(seconds) {
    const totalSeconds = Math.floor(Number(seconds) || 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// update profile controller
exports.updateProfile = async (req, res) => {
    try {
        console.log("=== UPDATE PROFILE CONTROLLER ===");
        console.log("Request Body:", req.body);
        console.log("User ID:", req.user.id);

        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            contactNumber,
            about
        } = req.body;

        const id = req.user.id;

        // Validation: require at least one field to update? Or strict? 
        // The original code was strict. Let's keep it somewhat strict but adapt to frontend.
        // Frontend sends all fields usually.
        // Let's assume we need to update what's provided.

        // Find the user
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Update User fields (firstName, lastName)
        if (firstName) userDetails.firstName = firstName;
        if (lastName) userDetails.lastName = lastName;
        await userDetails.save();

        // Update Profile fields
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        if (dateOfBirth) profileDetails.dob = dateOfBirth;
        if (gender) profileDetails.gender = gender;
        if (contactNumber) profileDetails.contactNumber = contactNumber;
        if (about) profileDetails.about = about;

        await profileDetails.save();

        // Find updated user details with populated profile
        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
};


// delete account controller
exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // delete user
        await User.findByIdAndDelete({ _id: id });

        //Unenroll from all courses



        return res.status(200).json({
            success: true,
            message: "User account deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete user account",
            error: error.message,
        });
    }
};

// get profile controller
exports.getAllUserDetails = async (req, res) => {
    try {
        // get user id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id).populate("additionalDetails")
            .exec();

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: userDetails,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user details",
            error: error.message,
        });
    }
};

// getEnrolledCourses

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        const userDetails = await User.findOne({
            _id: userId,
        }).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            },
        }).exec()

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id ${userId}`,
            })
        }

        const userDetailsObj = userDetails.toObject()
        let SubsectionLength = 0
        for (let i = 0; i < (userDetailsObj.courses || []).length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            const courseContent = userDetailsObj.courses[i]?.courseContent || []
            for (let j = 0; j < courseContent.length; j++) {
                const subSections = courseContent[j]?.subSection || []
                totalDurationInSeconds += subSections.reduce(
                    (acc, curr) => acc + parseInt(curr?.timeDuration || 0, 10),
                    0
                )
                userDetailsObj.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength += subSections.length
            }
            const courseProgress = await CourseProgress.findOne({
                courseId: userDetailsObj.courses[i]._id,
                userId: userId,
            })
            const courseProgressCount = courseProgress?.completedVideos?.length ?? 0
            if (SubsectionLength === 0) {
                userDetailsObj.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetailsObj.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }

        return res.status(200).json({
            success: true,
            data: userDetailsObj.courses || [],
        })
    } catch (error) {
        console.error("getEnrolledCourses error:", error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

 

//  updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
    try {
        const id = req.user?.id;
        const displayPicture = req.files?.displayPicture;

        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Please login"
            });
        }
        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: "Display picture file is required"
            });
        }
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // Upload to Cloudinary (use "profile" or FOLDER_NAME for folder)
        const folder = process.env.FOLDER_NAME || "profile";
        const uploadResult = await uploadImageToCloudinary(displayPicture, folder);
        userDetails.image = uploadResult.secure_url;
        await userDetails.save();

        // Return user in same shape as getUserDetails (data property)
        const updatedUser = await User.findById(id).populate("additionalDetails").lean();
        return res.status(200).json({
            success: true,
            message: "Display picture updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        console.log("updateDisplayPicture error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update display picture",
            error: error.message,
        });
    }
};

// instructorDashboard

exports.instructorDashboard = async(req,res) =>{
    try{
        const courseDetails = await Course.find({instructor:req.user.id});

        const courseData = courseDetails.map((course)=>{
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            // create an new object with the additional fields 

            const courseDataWithStarts = {
                _id:course._id,
                courseName:course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDataWithStarts;
        })
        res.status(200).json({courses:courseData});
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}