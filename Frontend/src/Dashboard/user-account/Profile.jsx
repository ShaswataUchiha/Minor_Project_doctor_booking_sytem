import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadClousinary.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../../config.js";


const Profile = ({userData}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
    gender: "",
    photo: null,
    bloodType : "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: userData.name,
      email: userData.email,
      gender: userData.gender,
      photo: userData.photo,
      bloodType : userData.bloodType,
    });

    // Update photo if it's different
    if (userData.photo!== formData.photo) {
      setSelectedFile(userData.photo);
    }
  }, [userData])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    // setLoading(true);

    try {
      const data = await uploadImageToCloudinary(file);
      console.log(data)

      if (data?.url) {
        setSelectedFile(data.url);
        setFormData((prevData) => ({
          ...prevData,
          photo: data.url,
        }));
        toast.success("Photo uploaded successfully!");
        console.log("Photo uploaded successfully!");
      } else {
        throw new Error("Failed to upload photo. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Photo upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform form validation and submit the data to the server

    try {
      const res = await fetch(`${BASE_URL}/user/getSingleUser/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log("Error in Signup.JSX");
    }
  };
  return (
    <div className="mt-10
    
    
    ">
       <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter your blood type"
                name="bloodtype"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor text-[16px] text-headingColor placeholder:text-textColor"
                required
              />
            </div> 

            {/* Photo Upload */}
            <div className="flex items-center gap-4">
              {selectedFile && (
                <figure
                  className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
              flex items-center justify-center"
                >
                  <img
                    src={formData.photo}
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full border-2 border-primaryColor"
                  />
                </figure>
              )}

              <div className="relative">
                <input
                  type="file"
                  name="photo"
                  id="photoUpload"
                  accept=".jpg, .png"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="photoUpload"
                  className="block px-6 py-3 bg-[#0066ff46] text-headingColor text-[16px] font-medium rounded-lg cursor-pointer"
                >
                  Upload Photo
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading && true}
              type="submit"
              className="w-full bg-primaryColor text-white text-[16px] font-medium py-3 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            >
              {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
            </button>
          </form>
      
    </div>
  )
}

export default Profile