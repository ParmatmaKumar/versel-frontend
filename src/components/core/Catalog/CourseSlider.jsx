import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import Course_Card from "./Course_Card"

const CourseSlider = ({ Courses }) => {
  return (
    <div className="w-full">
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          modules={[Autoplay,Pagination,Navigation]}
          pagination={true}
          className="mySwiper pb-12"
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          // navigation={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          
          >
          {Courses.map((course, index) => (
            <SwiperSlide key={index}>
              <div className="group shadow-md">
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-950/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>

                <Course_Card
                  course={course}
                  height="h-[350px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-500 text-lg">
            No Courses Found
          </p>
        </div>
      )}
    </div>
  )
}

export default CourseSlider
