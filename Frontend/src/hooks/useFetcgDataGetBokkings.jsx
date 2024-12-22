import { React, useEffect, useState, useContext } from "react";
// import { token } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const useFetchData = (url) => {
  const [data, setData] = useState([]); // Will hold the doctors' data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(authContext); // Using the token from authContext

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        // Make the fetch request with the Authorization header
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json(); // Parse the response JSON

        if (!res.ok) {
          // If response is not ok, throw an error
          throw new Error(result.message + "❌");
        }

        // Accessing the doctors from the response
        const doctors = result.data?.doctors || [];
        setData(doctors); // Set the doctors data to the state
        setLoading(false); // Set loading to false after the data is fetched
      } catch (error) {
        setLoading(false); // Set loading to false in case of error
        setError(error.message); // Set the error message in state
      }
    };

    fetchData(); // Call the fetchData function

  }, [url, token]); // Re-run when URL or token changes

  return { data, loading, error }; // Return the data, loading, and error states
};

export default useFetchData;
