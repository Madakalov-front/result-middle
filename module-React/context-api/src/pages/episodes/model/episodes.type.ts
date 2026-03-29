import type { IInfoResponse } from "../../../shared/types";

export interface IEpisodesResponse {
  info: IInfoResponse;
  results: IEpisode[];
}

export interface IEpisode {
  id: number;
  name: string;
  episode: string;
}
