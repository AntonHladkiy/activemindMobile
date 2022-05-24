import {useEffect, useState} from 'react';
import {useCustomAxios} from '../../utils/axios';

export const usePatch = <PUT_TYPE, RESPONSE_TYPE>(
  urlParam: string,
): [
  (data: PUT_TYPE, url?: string) => void,
  RESPONSE_TYPE | null,
  boolean | null,
  string | null,
] => {
  const [putDeps, setPutDeps] = useState<{
    url?: string;
    data?: PUT_TYPE;
  }>();
  const [responseData, setResponseData] = useState<RESPONSE_TYPE | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const axios = useCustomAxios();

  useEffect(() => {
    if (!putDeps) return;
    (async (deps: {url?: string; data?: PUT_TYPE}) => {
      setResponseData(null);
      setError(null);
      setIsLoading(true);
      try {
        const response = (
          await axios.patch(urlParam + (deps.url ? deps.url : ''), deps.data)
        ).data as RESPONSE_TYPE;
        setResponseData(response);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    })(putDeps);
  }, [putDeps]);

  return [
    (data: PUT_TYPE, newUrl?: string) => {
      setPutDeps({url: newUrl, data: data});
    },
    responseData,
    isLoading,
    error,
  ];
};
