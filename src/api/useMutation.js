import { useState } from "react";
import { useApi } from "./ApiContext";

export default function useMutation(method, resource, tagsToInvalidate) {
  const { request, invalidateTags } = useApi();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (body, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await request(options.url || resource, {
        method,
        body: body ? JSON.stringify(body) : undefined,
      });
      setData(result);
      invalidateTags(tagsToInvalidate);
    } catch (e) {
      console.error(e);
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
}
