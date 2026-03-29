import { Link, useLoaderData, useNavigation } from "react-router";
import type { ICharactersResponse } from "./model/characters.type";
import { RootRoute } from "../../../app/route";
import { ContainerCard } from "../../../entities/containerCard";

export const CharactersPage = () => {
  const { results } = useLoaderData() as ICharactersResponse;
  const { state } = useNavigation();

  if (state === "loading") {
    return <h2>Loading characters...</h2>;
  }

  return (
    <>
      <h2>Characters</h2>
      <ContainerCard>
        {results.map(({ id, name, image }) => (
          <li key={id}>
            <Link to={RootRoute.characterPath(id)}>
              <h4>{name}</h4>
              <img src={image} alt={name} />
            </Link>
          </li>
        ))}
      </ContainerCard>
    </>
  );
};
