import { http } from "../../../app/api";
import { API } from "../../../shared/constants";
import type { ILocationsResponse } from "./locations.type";

export const locationsApi = {
  getLocations: (page: number) =>
    http<ILocationsResponse>(`${API}/location?page=${page}`),
};
