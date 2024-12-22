import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { authContext } from "../context/authContext.jsx";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "doctor",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform form validation and submit the data to the server

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data?.user,
          token: result.data.token,
          role: result.data.role,
        },
      });

      console.log(result, "Login Data");

      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.log("Error in Signup.JSX");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 md:px-5 py-6 md:py-10">
      <div className="w-full max-w-[90%] md:max-w-[500px] bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h3 className="text-headingColor text-[24px] md:text-[28px] leading-tight font-bold text-center mb-6">
          Welcome Back! 👋
        </h3>
        <p className="text-textColor text-center mb-8 text-[16px] md:text-[18px]">
          Login to access your account and continue your journey.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-headingColor mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none text-headingColor text-[16px]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-headingColor mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#0066ff61] rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none text-headingColor text-[16px]"
              required
            />
          </div>
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
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-primaryColor hover:underline text-sm"
            >
              Forgot password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[16px] font-medium py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
            >
              {loading ? <HashLoader size={25} color="#ffffff" /> : "Log in"}
              
            </button>
          </div>
        </form>
        <p className="mt-6 text-textColor text-center text-sm">
          Don&apos;t have an account?
          <Link
            to="/register"
            className="text-primaryColor font-medium hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
