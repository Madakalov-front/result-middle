import { locationApi } from "./locationApi";
import type { LoaderFunctionArgs } from "react-router";

export const locationrLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  return id ? await locationApi.getLocation(id) : [];
};
