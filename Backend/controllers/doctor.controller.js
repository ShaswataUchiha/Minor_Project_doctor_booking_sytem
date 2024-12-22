import Doctor from "../models/Doctor.model.js";
import Booking from "../models/Booking.model.js"
import { AsyncHandler } from "../Utils/AsyncHandeler.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { ApiError } from "../Utils/apiError.js";

const updateDoctor = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "User ID is required");
  }
  const updateDoctor = await Doctor.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );

  if (!updateDoctor) {
    throw new ApiError(404, "Doctor not found");
  }

  return res.status(200).json(
    new ApiResponse(true, "Doctor updated successfully", {
      data: updateDoctor,
    })
  );
});

const getSingleDoctor = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id)
    .populate("reviews")
    .select("-password");
  if (!doctor) {
    throw new ApiError(404, "doctor not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(true, "doctor fetched successfully", { data: doctor })
    );
});

const getAllDoctors = AsyncHandler(async (req, res) => {
  const { query } = req.query;
  let doctors;

  if (query) {
    doctors = await Doctor.find({
      // isApproved: "approved",
      $or: [
        { name: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
      ],
    }).select("-password");
  } else {
    doctors = await Doctor.find({}).select("-password"); // Use the existing `doctors` variable
  }

  return res.status(200).json(
    new ApiResponse(true, "All doctors fetched successfully", {
      data: doctors,
    })
  );
});


const deleteDoctor = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id);
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }
  await User.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(true, "Doctor deleted successfully"));
});

const getDoctorProfile = AsyncHandler(async (req, res) => {
  const doctorId = req.userId;

  // Fetch doctor profile
  const doctor = await Doctor.findById(doctorId).select("-password"); // Exclude password

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  // Fetch appointments
  const appointments = await Booking.find({ doctor: doctorId });

  return res
  .status(200)
  .json(
    new ApiResponse(true, "Doctor profile fetched successfully", {
      doctor,
      appointments,
    })
  );
});

export { updateDoctor, getSingleDoctor, getAllDoctors, deleteDoctor, getDoctorProfile };
