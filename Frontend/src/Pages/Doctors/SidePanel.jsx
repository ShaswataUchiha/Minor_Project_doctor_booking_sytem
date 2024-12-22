import React from "react";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSLots }) => {
  // console.log(doctorId)
  // const bookingHandeler = async () => {
  //   try {
  //     console.log("Doctor ID:", doctorId);
  //     console.log("Token:", token);
  
  //     const res = await fetch(
  //       `${BASE_URL}/bookings/checkout-session/${doctorId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     const data = await res.json();
  
  //     if (!res.ok) {
  //       console.error("Server Response:", data);
  //       throw new Error(data.message || "Failed to create checkout session");
  //     }
  
  //     if (data.message.url) {
  //       window.location.href = data.url;
  //     } else {
  //       throw new Error("URL not found in the response");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     toast.error(error.message);
  //   }
  // };
  
  const bookingHandeler = async () => {
    try {
      console.log("Doctor ID:", doctorId);
      console.log("Token:", token);
  
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error("Server Response:", data);
        throw new Error(data.message || "Failed to book the appointment");
      }
  
      // Display a success message
      toast.success("Appointment booked successfully!");
  
      // Optionally, redirect to a success page or update the UI
      console.log("Booking Details:", data.booking);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "An unexpected error occurred");
    }
  };
  
  
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} INR
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSLots?.map((item, index) => (
            <li className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.startingTime} - {item.endingTime}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={bookingHandeler} className="btn px-2 w-full rounded-md ">
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
