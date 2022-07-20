import axios from "axios";
import { useState } from "react";

export const useAxiosFetcher = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const axiosFetcher = async (endPoint: string) => {
    setData(null);
    setError("");
    try {
      const res = await axios.get(endPoint);
      setData(res.data);
    } catch (err) {
      setError("Error: " + err);
    }
  };
  return { data, axiosFetcher, error };
};
