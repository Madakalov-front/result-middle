import { createRoutesFromElements, Route } from "react-router";
import { HomePage } from "../../pages/home/HomePage";
import { ROUTE } from "../../shared/constants";
import { DashboardPage } from "../../pages/dashboard/DashboardPage";
import { DashboardLayout, RootLayout } from "../layout";
import { LoginPage } from "../../pages/login/LoginPage";
import { checkAuthLogin } from "../../pages/login/checkAuthLogin";
import { PrivateRoute } from "./PrivateRoute";
import { checkAuthDashboard } from "../../pages/dashboard/checkAuthDashboard";
import { loaderUserInfo } from "../../pages/stats/loaderUserInfo";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { SettingPage } from "../../pages/settings/SettingPage";
import { StatsPage } from "../../pages/stats/StatsPage";

export const rootRoute = createRoutesFromElements(
  <>
    <Route path={ROUTE.home} element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route
        path={ROUTE.login}
        element={<LoginPage />}
        loader={checkAuthLogin}
      />
      <Route
        path={ROUTE.dashboard.root}
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
        loader={checkAuthDashboard}
      >
        <Route index element={<DashboardPage />} />
        <Route path={ROUTE.dashboard.profile} element={<ProfilePage />} />
        <Route path={ROUTE.dashboard.settings} element={<SettingPage />} />
        <Route
          path={ROUTE.dashboard.stats}
          element={<StatsPage />}
          loader={loaderUserInfo}
        />
      </Route>
    </Route>
  </>,
);
