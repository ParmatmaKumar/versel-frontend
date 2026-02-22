import React from "react"
import { useDispatch, useSelector } from "react-redux"
import ReactStars from "react-rating-stars-component"
import { GiNinjaStar } from "react-icons/gi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { removeFromCart } from "../../../../slices/cartSlice"

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col gap-6">
      {cart.map((course, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-6 bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-md"
        >
          {/* Thumbnail */}
          <div className="w-full md:w-48 h-40 md:h-28 shrink-0">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Course Info */}
          <div className="flex flex-col flex-1 justify-between">
            <div>
              <p className="text-lg font-semibold text-white">
                {course?.courseName}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {course?.category?.name}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-yellow-400 font-medium">5.0</span>

                <ReactStars
                  count={5}
                  size={18}
                  edit={false}
                  activeColor="#facc15"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />

                <span className="text-gray-400 text-sm">
                  ({course?.ratingAndRReviews?.length} Ratings)
                </span>
              </div>
            </div>
          </div>

          {/* Price + Remove */}
          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:gap-6">
            
            <div className="text-lg font-semibold text-white">
              ₹ {course?.price}
            </div>

            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-2 bg-gray-800 hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded-lg text-sm border border-gray-600 hover:border-red-500"
            >
              <RiDeleteBin6Line className="text-lg" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RenderCartCourses
