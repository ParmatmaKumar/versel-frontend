import React, { useCallback } from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  // FIX: useCallback so identity is stable across renders
  const handleAddToCart = useCallback(() => {
    // FIX: guard covers both missing accountType and explicit instructor check
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }

    if (token) {
      dispatch(addToCart(course))
      return
    }

    // Not logged in
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }, [user, token, course, dispatch, navigate, setConfirmationModal])

  // FIX: consistent key name — studentsEnrolled (not studentsEnroled)
  const isEnrolled =
    user && course?.studentsEnrolled?.includes(user?._id)

  // FIX: instructors see neither Buy Now nor Add to Cart
  const isInstructor = user?.accountType === ACCOUNT_TYPE.INSTRUCTOR

  return (
    <div className="flex flex-col gap-4 rounded-md border border-gray-600 bg-gray-700 p-4 text-gray-100">
      {/* Course Image
          FIX: removed hardcoded w-[400px]; now fully responsive using w-full */}
      <img
        src={ThumbnailImage}
        alt={course?.courseName}
        className="max-h-[300px] min-h-[180px] w-full overflow-hidden rounded-2xl object-cover"
      />

      <div className="px-4">
        <div className="space-x-3 pb-4 text-3xl font-semibold">
          Rs. {CurrentPrice}
        </div>

        <div className="flex flex-col gap-4">
          {/* Primary CTA */}
          {!isInstructor && (
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              onClick={isEnrolled ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse}
            >
              {isEnrolled ? "Go To Course" : "Buy Now"}
            </button>
          )}

          {/* Add to Cart — hidden for instructors and already-enrolled students */}
          {!isInstructor && !isEnrolled && (
            <button onClick={handleAddToCart} className="bg-gray-800 text-gray-100 px-4 py-2 rounded-md">
              Add to Cart
            </button>
          )}
        </div>

        <div>
          <p className="pb-3 pt-6 text-center text-sm text-gray-400">
            30-Day Money-Back Guarantee
          </p>
        </div>

        <div>
          <p className="my-2 text-xl font-semibold">This Course Includes :</p>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
            {course?.instructions?.map((item, i) => (
              <p className="flex gap-2" key={i}>
                <BsFillCaretRightFill />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 py-6 text-yellow-100"
            onClick={handleShare}
          >
            <FaShareSquare size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard
