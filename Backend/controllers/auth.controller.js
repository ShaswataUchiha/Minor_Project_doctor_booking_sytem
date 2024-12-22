import { AsyncHandler } from "../Utils/AsyncHandeler.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import User from "../models/User.model.js";
import Doctor from "../models/Doctor.model.js";
import { ApiError } from "../Utils/apiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (user) => {
  const token = jwt.sign({ id: user._id, role : user.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const registerUser = AsyncHandler(async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  if (!email || !password || !name || !role || !gender) {
    throw new ApiError(400, "User fields are required");
  }

  let user = null;

  if (role === "patient") {
    user = await User.findOne({ email });
  } else if (role === "doctor") {
    user = await Doctor.findOne({ email });
  }

  if (user) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (role === "patient") {
    user = await User.create({
      email,
      password: hashedPassword,
      name,
      photo,
      gender,
      role,
    });
  }

  if (role === "doctor") {
    user = await Doctor.create({
      email,
      password: hashedPassword,
      name,
      photo,
      role,
    });
  }

  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered Successfully"));
});

const loginUser = AsyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ApiError(400, "All fields (email, password, role) are required");
  }

  if (!["patient", "doctor"].includes(role)) {
    throw new ApiError(400, "Invalid role. Role must be 'patient' or 'doctor'");
  }

  const user = await (role === "patient"
    ? User.findOne({ email })
    : Doctor.findOne({ email }));

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid password");
  }

  const token = generateToken(user);
  const options = {
    httpOnly: true,
    secure: true, // Use secure cookies in production (requires HTTPS)
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const { password: pwd, role: userRole, appointments, ...userData } = user._doc;

  return res
   .status(200)
   .cookie("token", token, options)
   .json(new ApiResponse(200, "User logged in Successfully", { token, user: userData, role }));
});

export { registerUser, loginUser };
