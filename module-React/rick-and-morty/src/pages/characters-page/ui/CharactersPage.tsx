import { Await, Link, useLoaderData } from "react-router";
import { Container, TitlePage } from "../../../shared/ui";
import { CardCharacter } from "../../../entities/card-character";
import type { IFetchCharacters } from "../model";
import { Suspense } from "react";

export const CharactersPage = () => {
  const results = useLoaderData() as IFetchCharacters[];
  return (
    <>
      <TitlePage title="Characters page" />
      <Suspense fallback={<p>Loading characters...</p>}>
        <Await resolve={results}>
          <Container>
            {results.map(({ name, image, id }) => (
              <Link to={id.toString()} key={id}>
                <CardCharacter name={name} image={image} />
              </Link>
            ))}
          </Container>
        </Await>
      </Suspense>
    </>
  );
};
