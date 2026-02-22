import React, { useCallback, useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesApi"

import GetAvgRating from "../utils/avgRating"
import { ACCOUNT_TYPE } from "../utils/constants"
import Error from "./Error"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { paymentLoading } = useSelector((state) => state.course)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { courseId } = useParams()

  // Course data & loading state (separate from profile loading)
  const [response, setResponse] = useState(null)
  const [courseLoading, setCourseLoading] = useState(true)

  const [confirmationModal, setConfirmationModal] = useState(null)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [isActive, setIsActive] = useState([])
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)

  // Fetch course details
  useEffect(() => {
    (async () => {
      setCourseLoading(true)
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      } finally {
        setCourseLoading(false)
      }
    })()
  }, [courseId])

  // Calculate average rating
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

  // Calculate total lectures
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection?.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  const handleActive = (id) => {
    setIsActive((prev) =>
      !prev.includes(id) ? [...prev, id] : prev.filter((e) => e !== id)
    )
  }

  // FIX: memoized with useCallback so the child never holds a stale reference
  // FIX: also guards against an already-enrolled student trying to buy again
  const handleBuyCourse = useCallback(() => {
    // Instructors cannot buy courses
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      return
    }

    // Already enrolled — send to dashboard instead
    if (
      user &&
      response?.data?.courseDetails?.studentsEnrolled?.includes(user?._id)
    ) {
      navigate("/dashboard/enrolled-courses")
      return
    }

    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }

    // Not logged in
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }, [token, user, courseId, navigate, dispatch, response])

  // Show spinner while fetching course data (uses dedicated courseLoading, not profile loading)
  if (courseLoading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!response.success) {
    return <Error />
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full bg-gray-800">
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">

            {/* Mobile Thumbnail */}
            <div className="relative block max-h-120 lg:hidden">
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>

            {/* Course Text Content */}
            <div className="z-30 my-5 flex flex-col gap-4 py-5 text-lg text-gray-100">
              <p className="text-4xl font-bold sm:text-[42px]">{courseName}</p>
              <p className="text-gray-300">{courseDescription}</p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-yellow-400">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>

              <p>
                Created By {instructor ? `${instructor.firstName} ${instructor.lastName}` : "Unknown"}
              </p>

              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      {/*
        FIX: CourseDetailsCard is now a sibling of the left-content wrapper,
        not nested inside it. This allows lg:absolute positioning to work
        correctly relative to the outer container.
      */}


      <div className="mx-auto box-content px-4 text-gray-100 lg:w-[1260px]">
        <div className="relative mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">

          {/* What You Will Learn */}
          <div className="my-8 border border-gray-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <div className="flex flex-col gap-3">
                {whatYouWillLearn
                  ?.split(",")
                  .map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <p>{item.trim()}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <p className="text-[28px] font-semibold">Course Content</p>
                <p className="text-sm text-gray-400">
                  {courseContent?.length} sections • {totalNoOfLectures} lectures
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="rounded-md bg-gray-800 px-4 py-2 text-gray-100"
                  onClick={() => setIsActive([])}
                >
                  Collapse All
                </button>
                <button
                  className="rounded-md bg-gray-800 px-4 py-2 text-gray-100"
                  onClick={() => setIsActive(courseContent?.map((c) => c._id) ?? [])}
                >
                  Expand All
                </button>
              </div>
            </div>

            <div className="py-6">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Section */}
            {instructor && (
              <div className="mb-12 py-4">
                <p className="text-[28px] font-semibold">Author</p>

                <div className="flex items-center gap-4 py-4">
                  <img
                    src={
                      instructor.image
                        ? instructor.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                    }
                    alt="Author"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <p className="text-lg">
                    {`${instructor.firstName} ${instructor.lastName}`}
                  </p>
                </div>

                <p className="text-gray-200">
                  {instructor?.additionalDetails?.about}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FIX: Card is now a sibling of the left-content div so lg:absolute
            positions it relative to the shared lg:w-[1260px] container */}
        <div className="right-4 top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
          <CourseDetailsCard
            course={response?.data?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>

      <div className="mt-12">
        <Footer />
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  )
}

export default CourseDetails
