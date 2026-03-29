import { Link, useLoaderData, useNavigation } from "react-router";
import type { ILocationsResponse } from "../model";
import { ContainerCard } from "../../../entities/containerCard";
import { RootRoute } from "../../../app/route";

export const LocationsPage = () => {
  const { results } = useLoaderData() as ILocationsResponse;
  const { state } = useNavigation();

  if (state === "loading") {
    return <h2>Loading locations page...</h2>;
  }

  return (
    <>
      <h2>Locations</h2>
      <ContainerCard>
        {results.map(({ id, name, type }) => (
          <li key={id}>
            <Link to={RootRoute.locationPath(id)}>
              <h4>{name}</h4>
              <span>{type}</span>
            </Link>
          </li>
        ))}
      </ContainerCard>
    </>
  );
};
