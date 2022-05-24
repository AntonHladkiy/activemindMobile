import {useEffect, useState} from 'react';
import {useCustomAxios} from '../../utils/axios';

type Props<T> = [
  T | undefined,
  (id: number | string | null) => void,
  boolean,
  string | undefined,
  () => void,
];

export const useGetById = <RESPONSE_TYPE>(
  url: string,
): Props<RESPONSE_TYPE> => {
  const [updateObject, setUpdateObject] = useState<{}>({});
  const [responseData, setResponseData] = useState<RESPONSE_TYPE>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [id, setId] = useState<number | string | null>(null);
  const axios = useCustomAxios();

  useEffect(() => {
    if (!url) return;
    if (!id) return;
    (async (functionId: number | string) => {
      setResponseData(undefined);
      setError(undefined);
      setIsLoading(true);
      try {
        const resp = (await axios.get(`${url}/${functionId}`))
          .data as RESPONSE_TYPE;
        setResponseData(resp);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    })(id);
  }, [url, id, updateObject]);
  return [responseData, setId, isLoading, error, () => setUpdateObject({})];
};
