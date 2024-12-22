import React, { useState } from "react";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";
import useFetchData from "../../hooks/useFetchData";
import useFetchDataDoctorOverview from "../../hooks/useFetchDataDoctorOverview";
import { BASE_URL } from "../../config";
import Tabs from "./Tabs";
import startIcon from "../../assets/images/Star.png";
import DoctorAbout from "./../../Pages/Doctors/DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";

const DoctorDashboard = () => {
  const { data, loading, error } = useFetchDataDoctorOverview(
    `${BASE_URL}/doctor/profile/me`
  );

  // console.log(data)

  const [tab, setTab] = useState("overview");

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        {!loading && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div>
              {/* {data.isapproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="w-6 h-6"
                  >
                    <path d="M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z"></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    To get approvel please complete your profile. Reviw manually
                    and check
                  </div>
                </div>
              )} */}

              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img
                          src={data?.doctor?.photo}
                          alt=""
                          className="w-full"
                        />
                      </figure>

                      <div>
                        <span
                          className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-3 lg:px-6
                        rounded text-[12px] loading-4 lg:text-[16px] lg:leading-6 font-semibold"
                        >
                          {data?.doctor?.spcilization}
                        </span>

                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data?.doctor?.name}
                        </h3>

                        <div className="flex items-center gap-[6px]">
                          <span
                            className="flex items-center gap-[6px] text-headingColor
                          text-[14px]"
                          >
                            <img src={startIcon} alt="" />
                            {data?.doctor?.averageRating}
                          </span>
                          <span
                            className="flex items-center gap-[6px] text-headingColor
                          text-[14px]"
                          >
                            <img src={startIcon} alt="" />
                            {data?.doctor?.totalRating}
                          </span>
                        </div>

                        <p className="text__para font-[15px] lg:max-w-[390px] leading-6">
                          Doctor Bio
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={data?.doctor?.name}
                      about={data?.doctor?.about}
                      qualifications={data?.doctor?.qualifications}
                      experience={data?.doctor?.experience}
                    />
                  </div>
                )}

                {tab === "appoinments" && (
                  <Appointments appointments={data.appointments} />
                )}
                {tab === "settings" && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDashboard;
