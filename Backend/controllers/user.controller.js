import User from "../models/User.model.js";
import Booking from "../models/Booking.model.js";
import Doctor from "../models/Doctor.model.js";
import { AsyncHandler } from "../Utils/AsyncHandeler.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { ApiError } from "../Utils/apiError.js";

const updateUser = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "User ID is required");
  }
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );

  if (!updateUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(true, "User updated successfully", { data: updateUser })
    );
});

const getSingleUser = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(true, "User fetched successfully", { data: user }));
});

const getAllUsers = AsyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(true, "All users fetched successfully", { data: users })
    );
});

const deleteUser = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID format");
  }
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  await User.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(true, "User deleted successfully"));
});

const getUserProfile = AsyncHandler(async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    throw new ApiError(404, "User not found");
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(true, "User profile fetched successfully", { data: user })
    );
});

const getMyApponments = AsyncHandler(async (req, res) => {
  // Retrieve appoinments from booking for specified user
  const bookings = await Booking.find({ user: req.userId });

  // get doctor ids
  const dotorIds = await bookings.map((el) => el.doctor.id);

  // retrive doctor using doctor ids
  const doctors = await Doctor.find({ _id: { $in: dotorIds } }).select(
    "-password"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(true, "appointments fetched successfully", {
        data: { bookings, doctors },
      })
    );
});

export { updateUser, getSingleUser, getAllUsers, deleteUser, getUserProfile, getMyApponments };
