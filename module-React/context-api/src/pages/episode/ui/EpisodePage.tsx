import { useLoaderData } from "react-router";
import type { IEpisode } from "../../episodes/model";

export const EpisodePage = () => {
  const { name, episode } = useLoaderData() as IEpisode;
  return (
    <div>
      <h2>{name}</h2>
      <span>{episode}</span>
    </div>
  );
};
