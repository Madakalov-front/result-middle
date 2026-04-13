import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteScrollParams {
  hasNextPage: boolean;
  isLoading: boolean;
  onLoadMore: () => void | Promise<void>;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isLoading,
  onLoadMore,
  rootMargin = "200px",
}: UseInfiniteScrollParams) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          const firstEntry = entries[0];

          if (firstEntry?.isIntersecting && hasNextPage) {
            onLoadMore();
          }
        },
        { rootMargin },
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [hasNextPage, isLoading, onLoadMore, rootMargin],
  );

  useEffect(() => {
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return { lastElementRef };
};