import { React, useEffect, useState, useContext } from "react";
import { authContext } from "../context/authContext";

const useFetchData = (url) => {
  const [data, setData] = useState(null); // Default to null to handle objects better
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(authContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message + "❌");
        }

        // Update data with the correct structure
        setData(result.data); // The API response has `data`, not `data.data`
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
};

export default useFetchData;
