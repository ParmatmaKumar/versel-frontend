import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { FaArrowLeft } from "react-icons/fa"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    if (!courseSectionData.length) return

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    if (currentSectionIndx === -1) return

    const currentSubSectionIndx =
      courseSectionData[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )

    if (currentSubSectionIndx === -1) return

    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[
        currentSubSectionIndx
      ]?._id

    setActiveStatus(courseSectionData[currentSectionIndx]?._id)
    setVideoBarActive(activeSubSectionId)
  }, [courseSectionData, location.pathname])

  return (
    <div className="w-full md:w-[320px] md:h-[calc(100vh-3.5rem)] bg-gray-50 border-r border-gray-200 flex flex-col">

      {/* Header Section */}
      <div className="p-4 sm:p-5 border-b border-gray-200 bg-white md:sticky md:top-0 z-10">

        {/* Back + Review */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4 ">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="font-medium text-gray-600 hover:text-black transition cursor-pointer p-2"
          >
            <span className="flex items-center text-center gap-2 ">
              <FaArrowLeft />
              <span className="text-[17px]">Back</span>
            </span>
          </button>

          <IconBtn
            text="Add Review"
            onClick={() => setReviewModal(true)}
          />
        </div>

        {/* Course Title */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {courseEntireData?.courseName}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {completedLectures?.length} / {totalNoOfLectures} completed
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gray-800 transition-all duration-300"
              style={{
                width: `${totalNoOfLectures
                    ? (completedLectures.length / totalNoOfLectures) * 100
                    : 0
                  }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-[50vh] md:max-h-none">

        {courseSectionData.map((course) => (
          <div key={course?._id} className="bg-white rounded-lg border border-gray-200">

            {/* Section Header */}
            <div
              onClick={() => setActiveStatus(course?._id)}
              className="cursor-pointer px-4 py-3 flex justify-between items-center hover:bg-gray-100 transition"
            >
              <span className="font-medium text-gray-800">
                {course?.sectionName}
              </span>
              <span className="text-gray-400 text-sm">
                {activeStatus === course?._id ? "−" : "+"}
              </span>
            </div>

            {/* Subsections */}
            {activeStatus === course?._id && (
              <div className="border-t border-gray-100">
                {course.subSection.map((topic) => {
                  const isActive = videoBarActive === topic._id
                  const isCompleted = completedLectures.includes(topic?._id)

                  return (
                    <div
                      key={topic?._id}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic?._id)
                      }}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 text-sm
                        ${isActive
                          ? "bg-gray-200 text-gray-900 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        readOnly
                        className="accent-gray-800"
                      />
                      <span className="truncate">{topic.title}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
