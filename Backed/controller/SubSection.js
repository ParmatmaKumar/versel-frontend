const Section = require("../model/Section");
const SubSection = require("../model/SubSection");
const { uploadVideoToCloudinary } = require("../utils/imageUploader");

// Create Section ka handler function
exports.createSubSection = async (req, res) => {
    try {
        // fetch data
        const { sectionId, title, description, timeDuration } = req.body;

        // extract video file
        const video = req.files.videoFile;

        // validation
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",

            });
        }
        // Upload the video file to Cloudinary
        const uploadDetails = await uploadVideoToCloudinary(
            video,
            process.env.FOLDER_NAME
        )
        console.log(uploadDetails)
        // Create a new sub-section with the necessary information
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.timeDuration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })

        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
        ).populate("subSection")




        return res.status(200).json({
            success: true,
            message: "SubSection created and added to section successfully",
            data: updatedSection,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create subsection",
            error: error.message,
        })
    }

};

// Update SubSection
exports.updateSubSection = async (req, res) => {
    try {
        // fetch data
        const { subSectionId, title, description, timeDuration } = req.body;
        // validation   
        if (!subSectionId || !title || !description || !timeDuration) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // update subsection
        const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId, {
            title,
            description,
            timeDuration,
        }, { new: true });
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedSubSection,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update subsection",
            error: error.message,
        })
    }
};

// Delete SubSection
exports.deleteSubSection = async (req, res) => {
    try {
        // fetch data
        const { subSectionId, sectionId } = req.body;
        // delete subsection
        await SubSection.findByIdAndDelete(subSectionId);

        // find the updated section and return it
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $pull: {
                subSection: subSectionId,
            }
        }, { new: true }).populate("subSection");

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedSection,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete subsection",
            error: error.message,
        })
    }
};

