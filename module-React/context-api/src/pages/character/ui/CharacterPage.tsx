import { useLoaderData } from "react-router";
import type { ICharacter } from "../../characters/ui/model/characters.type";

export const CharacterPage = () => {
  const { name, image } = useLoaderData() as ICharacter;
  return (
    <div>
      <h2>{name}</h2>
      <img src={image} alt={name} />
    </div>
  );
};
