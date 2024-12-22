import { React, useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const useFetchData = (url) => {
  const [data, setData] = useState(null);  // Change initial state to null, not an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(authContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error on each request
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        console.log(result)

        if (!res.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        setData(result.data?.doctor || result.data || null); // Set the data properly based on your API
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        toast.error(error.message); // Optional: Show error message using toast
      }
    };

    if (token) {
      fetchData(); // Only call if token exists
    } else {
      setError("No token found. Please log in.");
      setLoading(false);
    }
  }, [url, token]);  // Dependency array includes token to refetch when token changes

  return { data, loading, error };
};

export default useFetchData;
