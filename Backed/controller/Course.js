const Course = require("../model/Course")
const User = require("../model/User")
const Category = require("../model/Category")
const Section = require("../model/Section")
const SubSection = require("../model/SubSection")
const CourseProgress = require("../model/CoursesProgress")
const { uploadImageToCloudinary } = require("../utils/imageUploader");



// Create Course ka handler function
exports.createCourse = async (req, res) => {
    try {
        console.log("=== CREATE COURSE CONTROLLER CALLED ===");
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);
        console.log("User from req.user:", req.user);

        // fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, category, tag } = req.body;

        // get Thumbnail
        const thumbnail = req.files.thumbnail;

        // Validation
        if (!courseName || !category || !courseDescription || !whatYouWillLearn || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // check for instructor
        const instructorDetails = await User.findById(req.user.id);
        console.log("Instructor Details :--> ", instructorDetails);

        // ! Use for check only instructor can create course

        // if (instructorDetails.accoutType !== "Instructor") {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Only instructors are allowed to create course"
        //     })
        // }

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Only instructors are allowed to create course"
            });
        }

        // Check if the tag given is valid
        const tagDetails = await Category.findById(category)

        if (!tagDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            })
        }

        // upload Image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        console.log("Thumbnail Image URL :--> ", thumbnailImage.secure_url);

        // create entry in for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn: whatYouWillLearn,
            price,
            status: "Draft",
            tag: tag,
            thumbnail: thumbnailImage.secure_url,
            instructor: instructorDetails._id,
            category: tagDetails._id,
        });

        // add course to user course list in instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: { courses: newCourse._id }
            },
            { new: true, }
        );

        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,

        })
    }
};


// Get all Courses ka handler function
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true,
        })
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success: true,
            message: "All Courses Fetched Successfully",
            data: allCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
            error: error.message,
        })
    };
}

// get Course Details handler function
exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const courseDetails = await Course.findById(courseId)
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionalDetails",
                    }
                })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .exec();


        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Course not found with id: ${courseId}`,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch course details",
            error: error.message,
        });
    }
}

// Edit course (instructor only)
exports.editCourse = async (req, res) => {
    try {
        const { courseId, courseName, courseDescription, whatYouWillLearn, price, category, tag, instructions, status } = req.body;
        const thumbnail = req.files?.thumbnail;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        const updateFields = {};
        if (courseName !== undefined) updateFields.courseName = courseName;
        if (courseDescription !== undefined) updateFields.courseDescription = courseDescription;
        if (whatYouWillLearn !== undefined) updateFields.whatYouWillLearn = whatYouWillLearn;
        if (price !== undefined) updateFields.price = Number(price);
        if (category !== undefined) updateFields.category = category;
        if (tag !== undefined) updateFields.tag = Array.isArray(tag) ? tag : (typeof tag === "string" ? tag.split(",").map(t => t.trim()) : [tag]);
        if (instructions !== undefined) {
            try {
                updateFields.instructions = typeof instructions === "string" ? JSON.parse(instructions) : instructions;
            } catch (_) {
                updateFields.instructions = instructions;
            }
        }
        if (status !== undefined && ["Draft", "Published"].includes(status)) updateFields.status = status;

        if (thumbnail) {
            const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
            updateFields.thumbnail = thumbnailImage.secure_url;
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $set: updateFields },
            { new: true }
        )
            .populate("category")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course",
            error: error.message,
        });
    }
};

// Get full course details (authenticated, for edit)
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        
        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: { path: "additionalDetails" },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: { path: "subSection" },
            })
            .exec();

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Course not found with id: ${courseId}`,
            });
        }

        // Fetch course progress for the user
        const courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        });

        // Convert courseDetails to plain object and add completedVideos
        const courseData = courseDetails.toObject();
        courseData.completedVideos = courseProgress?.completedVideos || [];

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseData,
        });


    } catch (error) {
        console.error("getFullCourseDetails error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch course details",
            error: error.message,
        });
    }
};

// Get Details for a Specific Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })

        console.log("Instructor courses found:", instructorCourses.length);

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params

        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}

// Mark lecture as complete for a student
exports.markLectureAsComplete = async (req, res) => {
    try {
        const userId = req.user.id
        const { courseId, subSectionId } = req.body

        if (!courseId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "courseId and subSectionId are required",
            })
        }

        // Ensure course exists
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: { path: "subSection" },
        })

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        // Optionally verify the subsection belongs to this course
        const allSubSections = course.courseContent.flatMap(
            (sec) => sec.subSection || []
        )
        const isValidSubSection = allSubSections.some(
            (ss) => ss._id.toString() === subSectionId
        )

        if (!isValidSubSection) {
            return res.status(400).json({
                success: false,
                message: "SubSection does not belong to this course",
            })
        }

        // Find or create course progress for this user & course
        let courseProgress = await CourseProgress.findOne({
            userId,
            courseId,
        })

        if (!courseProgress) {
            courseProgress = await CourseProgress.create({
                userId,
                courseId,
                completedVideos: [subSectionId],
            })

            // Attach to user document
            await User.findByIdAndUpdate(
                userId,
                { $push: { courseProgress: courseProgress._id } },
                { new: true }
            )
        } else if (
            !courseProgress.completedVideos.some(
                (id) => id.toString() === subSectionId
            )
        ) {
            courseProgress.completedVideos.push(subSectionId)
            await courseProgress.save()
        }

        return res.status(200).json({
            success: true,
            message: "Lecture marked as completed",
            data: courseProgress,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Failed to update course progress",
            error: error.message,
        })
    }
}
