import { React, useEffect, useState, useContext } from "react";
// import { token } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {token} = useContext(authContext)
  // console.log(token)

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        // console.log(token)
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          // signal,
        });

        // console.log(await res.clone().text());
        const result = await res.json();
        // console.log(result, "Result")

        if (!res.ok) {
          throw new Error(result.message + "❌");
        }
        setData(Array.isArray(result.data?.data) ? result.data.data : []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();

    // return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
