import { useLoaderData } from "react-router";

export const StatsPage = () => {
  const user = useLoaderData();
  return (
    <div>
      <h2>Stats</h2>
      <p>User: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};
