import type { LoaderFunctionArgs } from "react-router";
import { characterApi } from "./characterApi";

export const characterLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  return id ? await characterApi.getCharacter(id) : [];
};
