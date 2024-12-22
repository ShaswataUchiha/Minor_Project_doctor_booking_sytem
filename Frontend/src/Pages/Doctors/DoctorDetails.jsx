import React, { useState } from "react";
import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import { formateDate } from "../../utils/formateDate";
import SidePanel from "./SidePanel"; // Ensure this path is correct
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about"); // Initialize the state for tab selection

  const { id } = useParams();
  // console.log(id)

  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctor/getSingleDoctor/${id}`);

  console.log(doctor)

  const {
    name,
    qualifications,
    experience,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
  } = doctor;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {/* {error && <Error />} */}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={photo} alt="Doctor image" className="w-full" />
                </figure>
                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="Star Icon" /> {averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating})
                    </span>
                  </div>
                  <p className="text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                    {bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" ? "border-b-4 border-black" : ""
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" ? "border-b-4 border-black" : ""
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && (
                  <DoctorAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experience={experience}
                  />
                )}
                {tab === "feedback" && <Feedback 
                  reviews={reviews}
                  totalRating={totalRating}
                />}
              </div>
            </div>
            <div>
              <SidePanel 
              doctorId={doctor._id}
              ticketPrice={ticketPrice}
              timeSlots={timeSlots}
               />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;
