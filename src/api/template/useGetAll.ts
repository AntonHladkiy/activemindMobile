import {useEffect, useState} from 'react';
import {useCustomAxios} from '../../utils/axios';

export const useGetAll = <RESPONSE_TYPE>(
  url: string,
  fetchAtRender = true,
): [
  () => void,
  RESPONSE_TYPE | undefined,
  boolean | undefined,
  {message: string} | undefined,
] => {
  const [responseData, setResponseData] = useState<RESPONSE_TYPE>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<{message: string}>();
  const [update, setUpdate] = useState<any>();
  const axios = useCustomAxios();

  useEffect(() => {
    if (!url) return;
    if (!update && !fetchAtRender) return;
    (async () => {
      setResponseData(undefined);
      setError(undefined);
      setIsLoading(true);
      try {
        const resp = (await axios.get(url)).data;
        setResponseData(resp);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    })();
  }, [url, update]);

  return [() => setUpdate({}), responseData, isLoading, error];
};
