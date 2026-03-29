import { Link, useLoaderData, useNavigation } from "react-router";
import { ContainerCard } from "../../../entities/containerCard";
import type { IEpisodesResponse } from "../model";
import { RootRoute } from "../../../app/route";

export const EpisodesPage = () => {
  const { results } = useLoaderData() as IEpisodesResponse;
  const { state } = useNavigation();

  if (state === "loading") {
    return <h2>Loading characters...</h2>;
  }

  return (
    <>
      <h2>Episodes</h2>
      <ContainerCard>
        {results.map(({ id, name, episode }) => (
          <li key={id}>
            <Link to={RootRoute.episodePath(id)}>
              <h4>{name}</h4>
              <span>{episode}</span>
            </Link>
          </li>
        ))}
      </ContainerCard>
    </>
  );
};
