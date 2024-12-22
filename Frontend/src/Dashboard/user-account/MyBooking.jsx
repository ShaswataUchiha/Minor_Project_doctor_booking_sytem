import React from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "./../../Components/Doctors/DoctorCard";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";

const MyBooking = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/user/appoinments/my-appointments`);

  return (
    <div>
      {loading && <Loader />}

      {error && !loading && <Error errMessage={error} />}

      {!loading &&
        !error &&
        Array.isArray(appointments) &&
        appointments.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {appointments.map((doctor) => (
              <DoctorCard doctor={doctor} key={doctor._id} />
            ))}
          </div>
        )}

      {!loading &&
        !error &&
        Array.isArray(appointments) &&
        appointments.length === 0 && (
          <h2
            className="mt-5 text-center leading-7 text-[20px]
        font-semibold text-primaryColor"
          >
            You did not book any doctor yet
          </h2>
        )}
    </div>
  );
};

export default MyBooking;
