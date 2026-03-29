import { http } from "../../../../app/api";
import { API } from "../../../../shared/constants";
import type { ICharactersResponse } from "./characters.type";

export const charactersApi = {
  getCharacters: async (page: number) =>
    http<ICharactersResponse>(`${API}/character?page=${page}`),
};
