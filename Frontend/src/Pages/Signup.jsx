import React, { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import avatar from "../assets/images/doctor-img01.png";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../utils/uploadClousinary.js";
import { use } from "react";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL } from "../config.js";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
    gender: "",
    photo: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        setPreviewUrl(data.url);
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
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log("Error in Signup.JSX");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="max-w-[1170px] w-full bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Section: Illustration */}
        <div className="hidden lg:block bg-primaryColor">
          <img
            src={signupImg}
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h3 className="text-headingColor text-[24px] md:text-[28px] font-bold mb-6 text-center lg:text-left">
            Create an <span className="text-primaryColor">Account</span>
          </h3>
          <p className="text-textColor text-[16px] text-center lg:text-left mb-8">
            Join us today! Fill in your details to get started.
          </p>
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

            {/* Role and Gender Select */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-headingColor font-medium mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor text-[16px] text-textColor"
                >
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-headingColor font-medium mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor text-[16px] text-textColor"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="flex items-center gap-4">
              {selectedFile && (
                <figure
                  className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor
              flex items-center justify-center"
                >
                  <img
                    src={previewUrl}
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
              {loading ? <HashLoader size={35} color="#ffffff" /> : "Sign up"}
            </button>
          </form>

          {/* Already Have an Account */}
          <p className="mt-6 text-center text-[16px] text-textColor">
            Already have an account?{" "}
            <Link to="/Login" className="text-primaryColor font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
