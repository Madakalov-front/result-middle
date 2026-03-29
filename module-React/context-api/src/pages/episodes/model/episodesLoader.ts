import type { LoaderFunctionArgs } from "react-router";
import { getPage } from "../../../shared/util";
import type { IEpisodesResponse } from "./episodes.type";
import { episodesApi } from "./episodesApi";

export const episodesLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<IEpisodesResponse> => {
  const page = getPage(request);
  const data = await episodesApi.getEpisodes(page);
  return data;
};
