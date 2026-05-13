import { Link, useLoaderData, useNavigation } from "react-router";
import type { ICharactersResponse } from "./model/characters.type";
import { RootRoute } from "../../../app/route";
import { ContainerCard } from "../../../entities/containerCard";
import { useCallback, useRef, useState } from "react";
import { useInfiniteScroll } from "../../../shared/hooks/useInfiniteScroll";

export const CharactersPage = () => {
  const initialData = useLoaderData() as ICharactersResponse;
  const { state } = useNavigation();

  const [characters, setCharacters] = useState(initialData.results);
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
      const data: ICharactersResponse = await res.json();

      setCharacters((prev) => [...prev, ...data.results]);
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

  if (state === "loading" && characters.length === 0) {
    return <h2>Loading characters...</h2>;
  }

  return (
    <>
      <h2>Characters</h2>

      <ContainerCard>
        {characters.map(({ id, name, image }, index) => {
          const isLast = index === characters.length - 1;

          return (
            <li key={id} ref={isLast ? lastElementRef : null}>
              <Link to={RootRoute.characterPath(id)}>
                <h4>{name}</h4>
                <img src={image} alt={name} />
              </Link>
            </li>
          );
        })}
      </ContainerCard>

      {isLoading && <p>Загрузка...</p>}
      {!nextPage && <p>Больше персонажей нет</p>}
    </>
  );
};
