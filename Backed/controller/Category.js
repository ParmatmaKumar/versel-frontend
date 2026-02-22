const Category = require("../model/Category");
const Course = require("../model/Course");

// Helper function to get random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Create Category
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const categoryDetails = await Category.create({
            name,
            description
        });

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            data: categoryDetails,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating category",
            error: error.message,
        });
    }
};

// Show All Categories
exports.showAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}, "name description");

        return res.status(200).json({
            success: true,
            message: "All Category Fetched Successfully",
            data: categories,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching categories",
            error: error.message,
        });
    }
};

// Category Page Details
exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Validate categoryId
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required"
            });
        }

        // Get category details
        const selectedCategory = await Category.findById(categoryId).exec()

        //console.log("SELECTED CATEGORY", selectedCategory)
        // Handle the case when the category is not found
        if (!selectedCategory) {
            console.log("Category not found.")
            return res
                .status(404)
                .json({ success: false, message: "Category not found" })
        }

        // Get courses for this category directly from Course collection
        const categoryCourses = await Course.find({
            category: categoryId,
            status: "Published"
        })
            .populate("ratingAndReviews")
            .populate("instructor")
            .exec()

        console.log(`Found ${categoryCourses.length} published courses for category ${categoryId}`)

        // Attach courses to selectedCategory object
        selectedCategory.courses = categoryCourses
        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })

        let differentCategory = null;
        if (categoriesExceptSelected.length > 0) {
            const randomIndex = getRandomInt(categoriesExceptSelected.length);
            const randomCategoryId = categoriesExceptSelected[randomIndex]._id;
            const differentCategoryCourses = await Course.find({
                category: randomCategoryId,
                status: "Published"
            })
                .populate("instructor")
                .exec()
            
            differentCategory = await Category.findById(randomCategoryId).exec()
            if (differentCategory) {
                differentCategory.courses = differentCategoryCourses
            }
        }

        //console.log("Different COURSE", differentCategory)
        // Get top-selling courses across all categories directly from Course collection
        const allCourses = await Course.find({
            status: "Published"
        })
            .populate("instructor")
            .populate("category")
            .exec()
            
        const mostSellingCourses = allCourses
            .sort((a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0))
            .slice(0, 10)

        // Handle the case when there are no courses - return 200 with empty arrays
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(200).json({
                success: true,
                message: "Category found but no published courses available",
                data: {
                    selectedCategory: {
                        ...selectedCategory.toObject(),
                        courses: []
                    },
                    differentCategory,
                    mostSellingCourse: mostSellingCourses,
                },
            })
        }

        return res.status(200).json({
            success: true,
            message: "Category Details fetched successfully",
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourse: mostSellingCourses,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
