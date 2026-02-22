import React, { useEffect, useState } from "react"
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"
import ReactStars from "react-rating-stars-component"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import { FaStar, FaQuoteLeft } from "react-icons/fa"

import "swiper/css"
import "swiper/css/pagination"

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )

        if (response?.data?.success) {
          setReviews(response.data.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error)
      }
    }

    fetchAllReviews()
  }, [])

  // Prevent Swiper issues when reviews are small
  const shouldLoop = reviews.length > 4

  if (!reviews.length) {
    return (
      <div className="w-full max-w-[1260px] mx-auto">
        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/30 py-16 px-8 text-center">
          <p className="text-gray-400 text-lg">
            No reviews yet. Be the first to leave one!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="text-white w-full max-w-[1260px] mx-auto">
      <Swiper 
        key={reviews.length}
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        speed={600}
        autoplay={
            {
              delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              
            }
           
        }
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: Math.min(3, reviews.length),
          },
          1024: {
            slidesPerView: Math.min(3, reviews.length),
          },
           
        }}
        className="w-full pb-14"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={review._id || index}>
            <div className="h-full flex flex-col relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 p-6 transition-all duration-300 hover:border-amber-500">

              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-amber-500/20">
                <FaQuoteLeft className="text-3xl" />
              </div>

              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={
                    review?.user?.image ||
                    `https://api.dicebear.com/6.x/avataaars/svg?seed=${review?.user?.firstName}`
                  }
                  alt="user"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-500/40"
                />

                <div className="flex-1">
                  <p className="font-semibold text-white">
                    {review?.user?.firstName} {review?.user?.lastName}
                  </p>

                  <p className="text-sm text-amber-400">
                    {review?.course?.courseName}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <ReactStars
                      count={5}
                      value={Number(review?.rating) || 0}
                      size={16}
                      edit={false}
                      activeColor="#facc15"
                      color="#4b5563"
                      emptyIcon={<FaStar />}
                      filledIcon={<FaStar />}
                    />
                    <span className="text-amber-400 font-semibold text-sm">
                      {Number(review?.rating).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-4 italic flex-1">
                "{review?.review}"
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReviewSlider
