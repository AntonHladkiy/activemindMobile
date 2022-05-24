import { useEffect, useState } from "react";
import { useCustomAxios } from "../../utils/axios";

export const useDelete = <DELETE_TYPE, RESPONSE_TYPE>(
  urlParam: string,
): [
  (data: DELETE_TYPE, url?: string) => void,
  RESPONSE_TYPE | null,
  boolean | null,
  string | null,
] => {
  const [postDeps, setPostDeps] = useState<{
    url?: string;
    data?: DELETE_TYPE;
  }>();
  const [responseData, setResponseData] = useState<RESPONSE_TYPE | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const axios = useCustomAxios();

  useEffect(() => {
    if (!postDeps) return;
    (async (deps: { url?: string; data?: DELETE_TYPE }) => {
      setResponseData(null);
      setError(null);
      setIsLoading(true);
      try {
        const response = (
          await axios.delete(urlParam + (deps.url ? deps.url : ""), {
            data: deps.data,
          })
        ).data as RESPONSE_TYPE;
        setResponseData(response);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    })(postDeps);
  }, [postDeps]);

  return [
    (data: DELETE_TYPE, newUrl?: string) => {
      setPostDeps({ url: newUrl, data: data });
    },
    responseData,
    isLoading,
    error,
  ];
};
