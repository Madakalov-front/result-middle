import type { IInfoResponse } from "../../../../shared/types";

export interface ICharactersResponse {
  info: IInfoResponse;
  results: ICharacter[];
}

export interface ICharacter {
  id: number;
  name: string;
  image: string;
}
