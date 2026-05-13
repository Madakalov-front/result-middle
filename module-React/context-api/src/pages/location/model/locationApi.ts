import { http } from "../../../app/api";
import { API } from "../../../shared/constants";
import type { ILocation } from "../../locations/model";

export const locationApi = {
  getLocation: (id: string) => http<ILocation>(`${API}/location/${id}`),
};
