import { Link, useLoaderData, useNavigation } from "react-router";
import { ContainerCard } from "../../../entities/containerCard";
import type { IEpisodesResponse } from "../model";
import { RootRoute } from "../../../app/route";
import { useCallback, useRef, useState } from "react";
import { useInfiniteScroll } from "../../../shared/hooks";

export const EpisodesPage = () => {
  const initialData = useLoaderData<IEpisodesResponse>();
  const { state } = useNavigation();

  const [episodes, setEpisodes] = useState(initialData.results);
  const [nextPage, setNextPage] = useState<string | null>(
    initialData.info.next,
  );
  const [isLoading, setIsLoading] = useState(false);

  const isFetchingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (!nextPage || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const res = await fetch(nextPage);
      const data: IEpisodesResponse = await res.json();

      setEpisodes((prev) => [...prev, ...data.results]);
      setNextPage(data.info.next);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [nextPage]);

  const { lastElementRef } = useInfiniteScroll({
    hasNextPage: Boolean(nextPage),
    isLoading,
    onLoadMore: loadMore,
    rootMargin: "200px",
  });

  if (state === "loading" && episodes.length === 0) {
    return <h2>Loading episodes page...</h2>;
  }

  return (
    <>
      <h2>Episodes</h2>

      <ContainerCard>
        {episodes.map(({ id, name, episode }, index) => {
          const isLast = index === episodes.length - 1;

          return (
            <li key={id} ref={isLast ? lastElementRef : null}>
              <Link to={RootRoute.episodePath(id)}>
                <h4>{name}</h4>
                <span>{episode}</span>
              </Link>
            </li>
          );
        })}
      </ContainerCard>

      {isLoading && <p>Загрузка...</p>}
      {!nextPage && <p>Больше эпизодов нет</p>}
    </>
  );
};
