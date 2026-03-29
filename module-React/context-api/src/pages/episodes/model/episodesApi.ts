import { http } from "../../../app/api";
import { API } from "../../../shared/constants";
import type { IEpisodesResponse } from "./episodes.type";

export const episodesApi = {
  getEpisodes: async (page: number) =>
    http<IEpisodesResponse>(`${API}/episode?page=${page}`),
};
