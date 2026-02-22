// import { toast } from "react-hot-toast"

// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
// // import { setLoading } from "../../slices/profileSlice";
// import { apiConnector } from "../apiconnector"
// import { courseEndpoints } from "../apis"

// const {
//   COURSE_DETAILS_API,
//   COURSE_CATEGORIES_API,
//   GET_ALL_COURSE_API,
//   CREATE_COURSE_API,
//   EDIT_COURSE_API,
//   CREATE_SECTION_API,
//   CREATE_SUBSECTION_API,
//   UPDATE_SECTION_API,
//   UPDATE_SUBSECTION_API,
//   DELETE_SECTION_API,
//   DELETE_SUBSECTION_API,
//   GET_ALL_INSTRUCTOR_COURSES_API,
//   DELETE_COURSE_API,
//   GET_FULL_COURSE_DETAILS_AUTHENTICATED,
//   CREATE_RATING_API,
//   LECTURE_COMPLETION_API,
// } = courseEndpoints

// export const getAllCourses = async () => {
//   const toastId = toast.loading("Loading...")
//   let result = []
//   try {
//     const response = await apiConnector("GET", GET_ALL_COURSE_API)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch Course Categories")
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("GET_ALL_COURSE_API API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// export const fetchCourseDetails = async (courseId) => {
//   const toastId = toast.loading("Loading...")
//   //   dispatch(setLoading(true));
//   let result = null
//   try {
//     const response = await apiConnector("POST", COURSE_DETAILS_API, {
//       courseId,
//     })
//     console.log("COURSE_DETAILS_API API RESPONSE............", response)

//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }
//     result = response.data
//   } catch (error) {
//     console.log("COURSE_DETAILS_API API ERROR............", error)
//     result = error.response.data
//     // toast.error(error.response.data.message);
//   }
//   toast.dismiss(toastId)
//   //   dispatch(setLoading(false));
//   return result
// }

// // fetching the available course categories
// export const fetchCourseCategories = async () => {
//   let result = []
//   try {
//     const response = await apiConnector("GET", COURSE_CATEGORIES_API)
//     console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch Course Categories")
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("COURSE_CATEGORY_API API ERROR............", error)
//     toast.error(error.message)
//   }
//   return result
// }

// // add the course details
// export const addCourseDetails = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", CREATE_COURSE_API, data, {
//       "Content-Type": "multipart/form-data",
//       Authorisation: `Bearer ${token}`,
//     })
//     console.log("CREATE COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Add Course Details")
//     }
//     toast.success("Course Details Added Successfully")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("CREATE COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // edit the course details
// export const editCourseDetails = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", EDIT_COURSE_API, data, {
//       "Content-Type": "multipart/form-data",
//       Authorisation: `Bearer ${token}`,
//     })
//     console.log("EDIT COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Course Details")
//     }
//     toast.success("Course Details Updated Successfully")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("EDIT COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // create a section
// export const createSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", CREATE_SECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("CREATE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Create Section")
//     }
//     toast.success("Course Section Created")
//     result = response?.data?.updatedCourse
//   } catch (error) {
//     console.log("CREATE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // create a subsection
// export const createSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("CREATE SUB-SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Add Lecture")
//     }
//     toast.success("Lecture Added")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("CREATE SUB-SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // update a section
// export const updateSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("UPDATE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Section")
//     }
//     toast.success("Course Section Updated")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("UPDATE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // update a subsection
// export const updateSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("UPDATE SUB-SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Lecture")
//     }
//     toast.success("Lecture Updated")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("UPDATE SUB-SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // delete a section
// export const deleteSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", DELETE_SECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("DELETE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Delete Section")
//     }
//     toast.success("Course Section Deleted")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("DELETE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // delete a subsection
// export const deleteSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("DELETE SUB-SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Delete Lecture")
//     }
//     toast.success("Lecture Deleted")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("DELETE SUB-SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // fetching all courses under a specific instructor
// export const fetchInstructorCourses = async (token) => {
//   let result = []
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector(
//       "GET",
//       GET_ALL_INSTRUCTOR_COURSES_API,
//       null,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     )
//     console.log("INSTRUCTOR COURSES API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch Instructor Courses")
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("INSTRUCTOR COURSES API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // delete a course
// export const deleteCourse = async (data, token) => {
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("DELETE COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Delete Course")
//     }
//     toast.success("Course Deleted")
//   } catch (error) {
//     console.log("DELETE COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
// }

// // get full details of a course
// export const getFullDetailsOfCourse = async (courseId, token) => {
//   const toastId = toast.loading("Loading...")
//   //   dispatch(setLoading(true));
//   let result = null
//   try {
//     const response = await apiConnector(
//       "POST",
//       GET_FULL_COURSE_DETAILS_AUTHENTICATED,
//       {
//         courseId,
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     )
//     console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
//     result = error.response.data
//     // toast.error(error.response.data.message);
//   }
//   toast.dismiss(toastId)
//   //   dispatch(setLoading(false));
//   return result
// }

// // mark a lecture as complete
// export const markLectureAsComplete = async (data, token) => {
//   let result = null
//   console.log("mark complete data", data)
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log(
//       "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
//       response
//     )

//     if (!response.data.message) {
//       throw new Error(response.data.error)
//     }
//     toast.success("Lecture Completed")
//     result = true
//   } catch (error) {
//     console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
//     toast.error(error.message)
//     result = false
//   }
//   toast.dismiss(toastId)
//   return result
// }

// // create a rating for course
// export const createRating = async (data, token) => {
//   const toastId = toast.loading("Loading...")
//   let success = false
//   try {
//     const response = await apiConnector("POST", CREATE_RATING_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("CREATE RATING API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Create Rating")
//     }
//     toast.success("Rating Created")
//     success = true
//   } catch (error) {
//     success = false
//     console.log("CREATE RATING API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return success
// }





import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints

/* ----------------------------------------------------------
   GET ALL COURSES
---------------------------------------------------------- */
export const getAllCourses = async () => {
  const toastId = toast.loading("Loading courses...")
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    return response.data.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to load courses"
    )
    return []
  } finally {
    toast.dismiss(toastId)
  }
}

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("INSTRUCTOR COURSES API RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch instructor courses");
    }

    return response.data.data || [];

  } catch (error) {
    console.error("INSTRUCTOR COURSES API ERROR:", error);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
      console.error("Error Response Headers:", error.response.headers);
    }
    toast.error(error?.response?.data?.message || error.message);
    return [];
  } finally {
    toast.dismiss(toastId);
  }
};

/* ----------------------------------------------------------
   GET FULL COURSE DETAILS (AUTHENTICATED - FOR EDIT)
---------------------------------------------------------- */
export const getFullCourseDetails = async (courseId, token) => {
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch course details");
    }

    return response.data.data;
  } catch (error) {
    console.error("GET FULL COURSE DETAILS ERROR:", error);
    toast.error(error?.response?.data?.message || error?.message || "Failed to load course");
    return null;
  }
};

 

/* ----------------------------------------------------------
   GET COURSE DETAILS (PUBLIC)
   Backend expects POST with courseId in body
---------------------------------------------------------- */
export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading course...")
  try {
    const response = await apiConnector(
      "POST",
      COURSE_DETAILS_API,
      { courseId }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    // Return shape expected by CourseDetails: { success, data: { courseDetails } }
    return {
      success: response.data.success,
      data: {
        courseDetails: response.data.data,
      },
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to fetch course details"
    )
    return null
  } finally {
    toast.dismiss(toastId)
  }
}

/* ----------------------------------------------------------
   GET COURSE CATEGORIES
---------------------------------------------------------- */
export const fetchCourseCategories = async () => {
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    return response.data.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to fetch categories"
    )
    return []
  }
}

/* ----------------------------------------------------------
   CREATE COURSE
---------------------------------------------------------- */
export const addCourseDetails = async (data, token) => {
  const toastId = toast.loading("Creating course...")
  try {

    const response = await apiConnector(
      "POST",
      CREATE_COURSE_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Course created successfully")
    return response.data.data
  } catch (error) {
    if (error?.response?.status !== 401) {
      toast.error(
        error?.response?.data?.message || "Failed to create course"
      )
    }
    return null
  } finally {
    toast.dismiss(toastId)
  }
}

/* ----------------------------------------------------------
   EDIT COURSE
---------------------------------------------------------- */
export const editCourseDetails = async (data, token) => {
  const toastId = toast.loading("Updating course...")
  try {
    const response = await apiConnector(
      "POST",
      EDIT_COURSE_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Course updated successfully")
    return response.data.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to update course"
    )
    return null
  } finally {
    toast.dismiss(toastId)
  }
}

/* ----------------------------------------------------------
   CREATE SECTION
---------------------------------------------------------- */
export const createSection = async (data, token) => {
  const toastId = toast.loading("Creating section...")
  try {
    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Section created")
    return response.data.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to create section"
    )
    return null
  } finally {
    toast.dismiss(toastId)
  }
}

/* ----------------------------------------------------------
   CREATE SUBSECTION
---------------------------------------------------------- */
export const createSubSection = async (data, token) => {
  const toastId = toast.loading("Adding lecture...")
  try {
    const response = await apiConnector(
      "POST",
      CREATE_SUBSECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Lecture added")
    return response.data.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to add lecture"
    )
    return null
  } finally {
    toast.dismiss(toastId)
  }
}

// update a subsection
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

/* ----------------------------------------------------------
   UPDATE SECTION
---------------------------------------------------------- */
export const updateSection = async (data, token) => {
  const toastId = toast.loading("Updating section...")
  try {
    const response = await apiConnector(
      "POST",
      UPDATE_SECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Section updated")
    return response.data.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to update section"
    )
    return null
  } finally {
    toast.dismiss(toastId)
  }
}

/* ----------------------------------------------------------
   DELETE SUBSECTION
---------------------------------------------------------- */
export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("Deleting lecture...")
  try {
    const response = await apiConnector(
      "POST",
      DELETE_SUBSECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Lecture deleted")
    return response.data.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to delete lecture"
    )
    return null
  } finally {
    toast.dismiss(toastId)
  }
}

/* ----------------------------------------------------------
   DELETE SECTION
---------------------------------------------------------- */
export const deleteSection = async (data, token) => {
  const toastId = toast.loading("Deleting section...")
  try {
    const response = await apiConnector(
      "POST",
      DELETE_SECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Section deleted")
    return response.data.data
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to delete section"
    )
    return null
  } finally {
    toast.dismiss(toastId)
  }
}

/* ----------------------------------------------------------
   DELETE COURSE
---------------------------------------------------------- */
export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Deleting course...")
  try {
    const response = await apiConnector(
      "DELETE",
      `${DELETE_COURSE_API}/${courseId}`,
      null,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Course deleted")
    return true
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to delete course"
    )
    return false
  } finally {
    toast.dismiss(toastId)
  }
}

/* ----------------------------------------------------------
   MARK LECTURE COMPLETE
---------------------------------------------------------- */
export const markLectureAsComplete = async (data, token) => {
  try {
    const response = await apiConnector(
      "POST",
      LECTURE_COMPLETION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Lecture completed")
    return true
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to mark lecture complete"
    )
    return false
  }
}

/* ----------------------------------------------------------
   CREATE RATING
---------------------------------------------------------- */
export const createRating = async (data, token) => {
  const toastId = toast.loading("Submitting rating...")
  try {
    const response = await apiConnector(
      "POST",
      CREATE_RATING_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Rating submitted")
    return true
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to submit rating"
    )
    return false
  } finally {
    toast.dismiss(toastId)
  }
}
