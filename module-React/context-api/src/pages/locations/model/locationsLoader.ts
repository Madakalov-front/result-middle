import type { LoaderFunctionArgs } from "react-router";
import { getPage } from "../../../shared/util";
import { locationsApi } from "./locationsApi";

export const locationLoader = async ({ request }: LoaderFunctionArgs) => {
  const page = getPage(request);
  const data = await locationsApi.getLocations(page);

  return data;
};
