import { useCallback, useEffect, useState } from "react";

export const useFetchData = (fetchFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const res = await fetchFunction();
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, setData, loading, error, setLoading, refetch: load };
};