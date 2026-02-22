import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullCourseDetails } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullCourseDetails(courseId, token)
      if (!courseData) return

      // Backend returns the full course document in `data`
      dispatch(setCourseSectionData(courseData.courseContent || []))
      dispatch(setEntireCourseData(courseData))
      // Set completed lectures from API response (array of subsection IDs)
      dispatch(setCompletedLectures(courseData.completedVideos || []))

      let lectures = 0
      courseData?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
  }, [courseId, token, dispatch])

  return (
    <>
      <div className="relative flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)] bg-gray-100 text-gray-800">
        {/* Sidebar */}
        <div className="w-full md:w-auto bg-white border-b md:border-b-0 md:border-r border-gray-200 shadow-sm md:shadow-lg">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        {/* Main Content */}
        <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
