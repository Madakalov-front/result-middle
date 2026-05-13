import type { IInfoResponse } from "../../../shared/types";

export interface ILocationsResponse {
  info: IInfoResponse;
  results: ILocation[];
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
}
