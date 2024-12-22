import Review from "../models/Review.model.js"
import Doctor from "../models/Doctor.model.js"
import { AsyncHandler } from "../Utils/AsyncHandeler.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { ApiError } from "../Utils/apiError.js";

const getAllReviews = AsyncHandler(async(req, res) =>{
    const reviews = await Review.find({})

    return res
    .status(200)
    .json(new ApiResponse(true, "All reviews fetched successfully", { data: reviews }))
})

const createReview = AsyncHandler(async(req, res) =>{
    if(!req.body.doctor) req.body.doctor = req.params.doctorId;
    if(!req.body.user) req.body.user = req.userId;

    // const doctor = await Doctor.findById(req.body.doctor);
    // if (!doctor) {
    //     throw new ApiError(404, "Doctor not found");
    // }

    const newReview = new Review(req.body);

    const savedReviews = await newReview.save();

    await Doctor.findByIdAndUpdate(req.body.doctor, {
        $push : {reviews : savedReviews._id}
    })

    return res
   .status(201)
   .json(new ApiResponse(true, "Review created successfully", { data: savedReviews }))
})

export {getAllReviews, createReview}