import { useLoaderData } from "react-router";
import type { ILocation } from "../../locations/model";

export const LocationPage = () => {
  const { name, type } = useLoaderData() as ILocation;
  return (
    <div>
      <h2>{name}</h2>
      <span>{type ? type : "empty"}</span>
    </div>
  );
};
