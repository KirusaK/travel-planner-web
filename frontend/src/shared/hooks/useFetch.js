import { useEffect, useState } from "react";
import { getFlightById } from "../api/flights.js";

export const useFetch = (fetchFn, id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchFn(id)
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return {data, error, loading};
}