import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Td, Thead, Tr, Th, Tbody } from 'react-super-responsive-table'
import ConfirmationModal from "../../../common/ConfirmationModal"
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from 'react-router-dom'
import { formatDate } from "../../../../services/formatDate"


export default function CourseTable({ courses = [], setCourses }) {

  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const courseList = Array.isArray(courses) ? courses : []
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleCourseDelete = async (courseId) => {
    try {
      setLoading(true)

      await deleteCourse(courseId, token)

      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }

    } catch (error) {
      console.error("Delete failed:", error)
    } finally {
      setLoading(false)
      setConfirmationModal(null)
    }
  }

 return (
  <div className="w-full bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 text-gray-100">
    <Table className="w-full">

      <Thead>
        <Tr className="border-b border-gray-800 text-gray-400 text-sm uppercase tracking-wide">
          <Th className="pb-4 text-left">Course</Th>
          <Th className="pb-4 text-left">Duration</Th>
          <Th className="pb-4 text-left">Price</Th>
          <Th className="pb-4 text-center">Actions</Th>
        </Tr>
      </Thead>

      <Tbody>
        {courseList.length === 0 ? (
          <Tr>
            <Td colSpan="4" className="py-10 text-center">
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg font-medium text-gray-300">
                  No Courses Found
                </p>
                <p className="text-sm text-gray-500">
                  Start by creating your first course 🚀
                </p>
              </div>
            </Td>
          </Tr>
        ) : (
          courseList.map((course) => (
            <Tr
              key={course._id}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-all duration-200"
            >

              {/* Course Info */}
              <Td className="py-6">
                <div className="flex gap-5 items-start">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[90px] w-[140px] rounded-lg object-cover shadow-md"
                  />

                  <div className="space-y-2 max-w-md">
                    <p className="text-lg font-semibold text-gray-100">
                      {course.courseName}
                    </p>

                    <p className="text-sm text-gray-400 line-clamp-2">
                      {course.courseDescription}
                    </p>

                    <p className="text-xs text-gray-500">
                      Created: {formatDate(course.createdAt)}
                    </p>

                    {course.status === COURSE_STATUS.DRAFT ? (
                      <span className="inline-block text-xs font-medium px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-400">
                        Draft
                      </span>
                    ) : (
                      <span className="inline-block text-xs font-medium px-2 py-1 rounded-md bg-green-500/20 text-green-400">
                        Published
                      </span>
                    )}
                  </div>
                </div>
              </Td>

              {/* Duration */}
              <Td className="py-6 text-gray-300">
                2hr 30min
              </Td>

              {/* Price */}
              <Td className="py-6 font-medium text-gray-200">
                Rs.{course.price}
              </Td>

              {/* Actions */}
              <Td className="py-6">
                <div className="flex gap-3 justify-center">

                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50"
                  >
                    Edit
                  </button>

                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2: "All data related to this course will be deleted.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleCourseDelete(course._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-500 transition disabled:opacity-50"
                  >
                    Delete
                  </button>

                </div>
              </Td>

            </Tr>
          ))
        )}
      </Tbody>
    </Table>

    {confirmationModal && (
      <ConfirmationModal modalData={confirmationModal} />
    )}
  </div>
)

}
