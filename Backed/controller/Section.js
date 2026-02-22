const Section = require("../model/Section");
const Course = require("../model/Course");


exports.createSection = async (req, res) => {
    try {
        // fetch data
        const { courseId, sectionName, } = req.body;
        // validation
        if (!courseId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        //create section
        const newSection = await Section.create({
            sectionName,
        });

        //update course with section objectId

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id
            }
        }, { new: true }).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section created and added to course successfully",
            data: updatedCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create section",
            error: error.message,
        })
    }
};


// Update Section
exports.updateSection = async (req, res) => {
    try {
        // fetch data
        const { sectionId, sectionName, courseId } = req.body;
        // validation
        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // update section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            sectionName,
        }, { new: true });
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: course,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update section",
            error: error.message,
        })
    }
};

// Delete Section
exports.deleteSection = async (req, res) => {
    try {
        // fetch data
        const { sectionId, courseId } = req.body;
        // delete section
        await Section.findByIdAndDelete(sectionId);
        // delete sub sections
        // TODO: We should also delete properly all subsections associated with this section

        const course = await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        }, { new: true }).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: course,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete section",
            error: error.message,
        });
    }
};