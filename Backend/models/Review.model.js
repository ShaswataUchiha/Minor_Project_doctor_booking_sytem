import mongoose from "mongoose";
import Doctor from "./Doctor.model.js"

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

reviewSchema.statics.calcAvaarageRrtings = async function (doctorId) {
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group : {
        _id: "$doctor",
        avgRating: { $avg: "$rating" }
      }
    }
  ]);
  console.log(stats)

  await Doctor.findByIdAndDelete(doctorId, {
    totalRting: stats[0].numOfRating,
    avarageRating : stats[0].avgRating,
  });
};

reviewSchema.post("save", function() {
  this.constructor.calcAvaarageRrtings(this.doctor);
})

export default mongoose.model("Review", reviewSchema);
