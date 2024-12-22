import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Doctor from "../models/Doctor.model.js";
import { AsyncHandler } from "../Utils/AsyncHandeler.js";
import { ApiError } from "../Utils/apiError.js";

export const isAuthenticated = AsyncHandler(async (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decode.id;
    req.role = decode.role;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
});

export const restrict = roles => async(req, res, next) => {
    const {userId, role} = req;

    if (!userId || !role) {
      throw new ApiError(401, "Unauthorized: No user ID provided");
    }

    if (!roles.includes(role)) {
      return res
        .status(403)
        .json({sucess : false, message : "You are not authorized"})
    }
    
    const user =
    role === "patient"
      ? await User.findById(userId)
      : await Doctor.findById(userId);

    // console.log(user.role)

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });
    }

    req.user = user;

    next();
}
