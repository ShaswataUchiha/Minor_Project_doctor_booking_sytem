import React from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; 
import patientAvatar from "../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";

const Testimonial = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px] px-5">
      <Swiper
        modules={[Pagination, Autoplay]} 
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }} 
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {/* Testimonial Slides */}
        {[1, 2, 3, 4].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
              
            <div className="flex items-center gap-4">
                <img
                  src={patientAvatar}
                  alt="Patient Avatar"
                  className="w-16 h-16 rounded-full border border-gray-300"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    Wayne Collins
                  </h4>
                  <p className="text-sm text-gray-500">Satisfied Customer</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                I am truly grateful for the help I received from Dr. John Smith.
                He has been a life-changing companion throughout my journey.
                Thank you so much!
              </p>
              
              
              <div className="flex items-center gap-1 mt-4">
                <HiStar className="text-yellow-500 w-5 h-5" />
                <HiStar className="text-yellow-500 w-5 h-5" />
                <HiStar className="text-yellow-500 w-5 h-5" />
                <HiStar className="text-yellow-500 w-5 h-5" />
                <HiStar className="text-yellow-500 w-5 h-5" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
