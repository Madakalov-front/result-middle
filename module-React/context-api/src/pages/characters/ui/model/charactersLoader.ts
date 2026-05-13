import type { LoaderFunctionArgs } from "react-router";
import { charactersApi } from "./charactersApi";
import type { ICharactersResponse } from "./characters.type";
import { getPage } from "../../../../shared/util";

export const charactersLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<ICharactersResponse> => {
  const page = getPage(request);
  const data = await charactersApi.getCharacters(page);
  return data;
};
