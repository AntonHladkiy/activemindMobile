import { useEffect, useState } from "react";
import { useCustomAxios } from "../../utils/axios";

export const useDeleteById = <DELETE_TYPE>(
  url: string,
): [
  setDataId: (id: string | null) => void,
  response: DELETE_TYPE | undefined,
  isDeleting: boolean,
  error: string | undefined,
] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [dataId, setDataId] = useState<string | null | undefined>(undefined);
  const [response, setResponse] = useState<DELETE_TYPE>();
  const axios = useCustomAxios();

  useEffect(() => {
    if (!url) return;
    if (dataId === undefined) return;
    (async (id: string | null) => {
      setError(undefined);
      setIsLoading(true);
      const deleteUrl = dataId === null ? url : `${url}/${id}`;
      try {
        const resp = await axios.delete(deleteUrl);
        setResponse(resp.data);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    })(dataId);
  }, [url, dataId]);

  return [setDataId, response, isLoading, error];
};
