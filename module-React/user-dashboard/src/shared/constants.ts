export const DASHBOARD_ROOT = "dashboard";

export const ROUTE = {
  home: "/",
  login: "login",
  dashboard: {
    root: DASHBOARD_ROOT,
    profile: "profile",
    settings: "settings",
    stats: "stats",
  },
} as const;

export const LOCAL_FLAG_AUTH = "isAuthenticated";
