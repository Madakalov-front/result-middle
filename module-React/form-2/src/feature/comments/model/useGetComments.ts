import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { IComments } from "./comments.type";

type ErrorType = string | null;
type LoadCommentType = boolean;

export interface IUseGetComments {
  loadComments: LoadCommentType;
  comments: IComments;
  error: ErrorType;
  refetch: () => Promise<IComments>;
  setComments: Dispatch<SetStateAction<IComments>>;
}

export const useGetComments = (limit: number = 2): IUseGetComments => {
  const [loadComments, setLoadComments] = useState<LoadCommentType>(false);
  const [comments, setComments] = useState<IComments>([]);
  const [error, setError] = useState<ErrorType>(null);

  const limitRef = useRef(limit);

  useEffect(() => {
    limitRef.current = limit;
  }, [limit]);

  const getComments = useCallback(async (): Promise<IComments> => {
    try {
      setLoadComments(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_limit=${limitRef.current}`,
      );
      if (!response.ok) {
        throw new Error(
          `HTTP request comments, status code - ${response.status}`,
        );
      }
      const data = await response.json();
      setComments(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setError(error.message);
      }
      return [];
    } finally {
      setLoadComments(false);
    }
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  return {
    loadComments,
    comments,
    error,
    refetch: getComments,
    setComments,
  };
};
