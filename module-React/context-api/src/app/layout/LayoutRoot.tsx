import { Link, Outlet, useLocation } from "react-router";
import { ProtectedRoute, RootRoute } from "../route";
import { useAuthContext } from "../context/auth";

export const LayoutRoot = () => {
  const { username } = useAuthContext();
  const { pathname } = useLocation();

  return (
    <>
      <header style={{ textAlign: "center", padding: 12 }}>
        <Link to={RootRoute.home}>
          <h1 style={{ textTransform: "capitalize" }}>
            Welcome{username ? `, ${username}` : ""}!!!
          </h1>
        </Link>
        <nav>
          <ul
            style={{
              display: "flex",
              columnGap: 8,
              listStyle: "none",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <li>
              <Link to={RootRoute.characters}>Герои</Link>
            </li>
            <li>
              <Link to={RootRoute.locations}>Локации</Link>
            </li>
            <li>
              <Link to={RootRoute.episodes}>Эпизоды</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main style={{ padding: 12 }}>
        {pathname === RootRoute.home ? (
          <Outlet />
        ) : (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        )}
      </main>
      <footer style={{ textAlign: "center", padding: 12 }}>
        <h2>foooter</h2>
      </footer>
    </>
  );
};
