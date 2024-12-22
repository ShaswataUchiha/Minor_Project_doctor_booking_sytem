import { React, useContext, useState } from "react";
import userImg from "../../assets/images/doctor-img01.png";
import { authContext } from "./../../context/authContext";
import { useNavigate } from "react-router-dom";
import MyBooking from "./MyBooking";
import Profile from "./Profile";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/user/profile/me`);

  console.log(userData, "UserData");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch LOGOUT action to reset state
    localStorage.clear(); // Clear all authentication-related data
    navigate("/login"); // Redirect to login page
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}

        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure
                  className="w-[100px] h-[100px] rounded-full bottom-2 border-solid
                    border-primarycolor"
                >
                  <img
                    src={userData?.data?.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-14">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData?.data?.name}
                </h3>
                <p className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData?.data?.email}
                </p>
                <p className="text-[18px] leading-[30px] text-headingColor font-bold">
                  Blood Type
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData?.data?.bloodType}
                  </span>
                </p>
              </div>

              <div className="my-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Logout
                </button>
                <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px]
          leading-7 border border-solid border-blue-500`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px]
          leading-7 border border-solid border-blue-500`}
                >
                  Profile Settings
                </button>
              </div>
              <div className="md:col-span-2 md:px-[30px]">
                {tab === "bookings" ? <MyBooking /> : <Profile userData={userData} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
