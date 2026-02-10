import { useCallback, useEffect, useState } from "react";

export interface IData {
  id: number;
  title: string;
}

export interface IParamsRequest {
  params?: {
    [key: string]: string | number;
  };
}

export const useFetch = (url: string) => {
  if (!url || !url.trim()) {
    throw new Error("Не валидный url для запроса");
  }

  const [data, setData] = useState<IData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUrl = useCallback(
    async (paramsReq?: IParamsRequest) => {
      const urlReq = new URL(url);
      try {
        setIsLoading(true);

        if (paramsReq?.params) {
          const queryParams = paramsReq.params;
          Object.keys(queryParams).forEach((key) => {
            urlReq.searchParams.append(key, queryParams[key].toString());
          });
        }

        const res = await fetch(urlReq, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          setError("Данные не получены");
          throw new Error(`HTTP status: ${res.status}`);
        }
        const json = await res.json();
        if (Array.isArray(json) && json.length) {
          setData(json);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [url],
  );

  const refetch = useCallback(
    (params?: IParamsRequest) => fetchUrl(params),
    [fetchUrl],
  );

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);

  return { data, isLoading, error, refetch };
};
