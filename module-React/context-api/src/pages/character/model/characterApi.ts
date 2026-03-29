import { http } from "../../../app/api";
import { API } from "../../../shared/constants";
import type { ICharacter } from "../../characters/ui/model/characters.type";

export const characterApi = {
  getCharacter: (id: string) => http<ICharacter>(`${API}/character/${id}`),
};
