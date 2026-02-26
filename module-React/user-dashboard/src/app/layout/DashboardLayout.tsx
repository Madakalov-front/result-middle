import { Link, Outlet } from "react-router";
import { ROUTE } from "../../shared/constants";

export const DashboardLayout = () => {
  return (
    <>
      <ul>
        <li>
          <Link to={ROUTE.dashboard.profile} children="profile" />
        </li>
        <li>
          <Link to={ROUTE.dashboard.settings} children="settings" />
        </li>
        <li>
          <Link to={ROUTE.dashboard.stats} children="stats" />
        </li>
      </ul>
      <Outlet />
    </>
  );
};
