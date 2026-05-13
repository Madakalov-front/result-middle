import type { LoaderFunctionArgs } from "react-router";
import { episoderApi } from "./episodeApi";

export const episodeLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  console.log(id);
  return id ? await episoderApi.getEpisode(id) : [];
};
