import { http } from "../../../app/api";
import { API } from "../../../shared/constants";
import type { IEpisode } from "../../episodes/model";

export const episoderApi = {
  getEpisode: (id: string) => http<IEpisode>(`${API}/episode/${id}`),
};
