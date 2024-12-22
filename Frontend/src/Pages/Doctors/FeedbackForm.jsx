import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai"; // Import the star icon
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText) {
        setLoading(false);
        return toast.error("Please fill all fields.");
      }

      const res = await fetch(`${BASE_URL}/doctor/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      setLoading(false);
      toast.success("Review submitted successfully.");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form action="#">
        <div>
          <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
            How would you rate the overall experience?*
          </h3>
          <div className="flex justify-start items-center gap-2">
            {[...Array(5).keys()].map((_, index) => {
              index += 1;
              return (
                <button
                  key={index}
                  type="button"
                  className={`${
                    index <= (hover || rating)
                      ? "text-yellow-500" // Highlight stars on hover or rating
                      : "text-gray-400" // Default state
                  } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                  onClick={() => setRating(index)} // Set clicked rating
                  onMouseEnter={() => setHover(index)} // Highlight on hover
                  onMouseLeave={() => setHover(rating)} // Restore clicked state
                  onDoubleClick={() => {
                    setHover(0); // Reset hover
                    setRating(0); // Reset rating
                  }}
                >
                  <AiFillStar /> {/* Render the star icon */}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-[30px]">
          <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
            Share your feedback suggestion
          </h3>
          <textarea
            className="border border-solid border-[#0066ff34] focus-outline outline-primaryColor w-full px-4 py-3 rounded-md"
            rows="5"
            placeholder="Write your message"
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" onClick={handleSubmitReview} className="btn">
          {loading ? <HashLoader size={25} color="#fff" /> : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
