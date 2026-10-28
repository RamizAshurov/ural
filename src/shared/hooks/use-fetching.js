import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export function useFetching(callback) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchData = useCallback(
    async (...args) => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        const result = await callback(...args, { signal: controller.signal });
        if (!controller.signal.aborted) setData(result);
        return result;
      } catch (err) {
        if (!controller.signal.aborted && !axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        if (controllerRef.current === controller) setIsLoading(false);
      }
    },
    [callback],
  );

  useEffect(() => () => controllerRef.current?.abort(), []);

  return { fetchData, isLoading, error, data };
}
