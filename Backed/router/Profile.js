const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  instructorDashboard,
  getEnrolledCourses,

} = require("../controller/Profile")
const { isDemo } = require("../middlewares/demo");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, isDemo, deleteAccount)

router.put("/updateProfile", auth, isDemo, updateProfile)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

router.put("/updateDisplayPicture", auth, updateDisplayPicture)

router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)



module.exports = router;