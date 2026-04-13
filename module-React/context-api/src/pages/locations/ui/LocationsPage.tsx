import { Link, useLoaderData, useNavigation } from "react-router";
import type { ILocationsResponse } from "../model";
import { ContainerCard } from "../../../entities/containerCard";
import { RootRoute } from "../../../app/route";
import { useCallback, useRef, useState } from "react";
import { useInfiniteScroll } from "../../../shared/hooks";

export const LocationsPage = () => {
  const initialData = useLoaderData() as ILocationsResponse;
  const { state } = useNavigation();

  const [locations, setLocations] = useState(initialData.results);
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
      const data: ILocationsResponse = await res.json();

      setLocations((prev) => [...prev, ...data.results]);
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

  if (state === "loading" && locations.length === 0) {
    return <h2>Loading locations page...</h2>;
  }

  return (
    <>
      <h2>Locations</h2>

      <ContainerCard>
        {locations.map(({ id, name, type }, index) => {
          const isLast = index === locations.length - 1;

          return (
            <li key={id} ref={isLast ? lastElementRef : null}>
              <Link to={RootRoute.locationPath(id)}>
                <h4>{name}</h4>
                <span>{type}</span>
              </Link>
            </li>
          );
        })}
      </ContainerCard>

      {isLoading && <p>Загрузка...</p>}
      {!nextPage && <p>Больше локаций нет</p>}
    </>
  );
};
