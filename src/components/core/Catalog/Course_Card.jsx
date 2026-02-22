import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avgRating"

const Course_Card = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    if (course?.ratingAndReviews?.length > 0) {
      const count = GetAvgRating(course?.ratingAndReviews)
      setAvgReviewCount(count)
    }
  }, [course?.ratingAndReviews])

  return (
    <div
      className="group relative rounded-md overflow-hidden 
      bg-gray-900 border border-gray-800
      shadow-md "
    >
      <Link to={`/course/${course?._id}`} className="block h-full">

        {/* Thumbnail - 16:9 Ratio */}
        <div className="relative w-full aspect-video overflow-hidden">
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className="w-full h-full object-cover 
            transition-transform duration-500 "
          />

          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-80" />
        </div>

        {/* Course Info */}
        <div className="flex flex-col gap-1 p-4">

          {/* Title */}
          <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-gray-300 transition-colors">
            {course?.courseName}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-gray-400">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-semibold text-sm">
              {avgReviewCount || 0}
            </span>

            <RatingStars Review_Count={avgReviewCount} Star_Size={18} />

            <span className="text-gray-500 text-xs">
              ({course?.ratingAndReviews?.length || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold text-white">
              ₹ {course?.price}
            </p>

            <span className="text-xs px-3 py-1 rounded-full 
              bg-gray-800 text-gray-300 border border-gray-700 
              group-hover:bg-yellow-400 group-hover:text-black transition">
              Enroll
            </span>
          </div>

        </div>
      </Link>
    </div>
  )
}

export default Course_Card
