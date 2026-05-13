import { createBrowserRouter } from "react-router";
import { LayoutRoot } from "../layout";
import { RootRoute } from "./routes";
import { charactersLoader } from "../../pages/characters/ui/model/charactersLoader";
import { locationLoader } from "../../pages/locations/model";
import { episodesLoader } from "../../pages/episodes/model";
import { characterLoader } from "../../pages/character/model";

export const rootRouter = createBrowserRouter([
  {
    path: RootRoute.home,
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        hydrateFallbackElement: <h2>Loading home page...</h2>,
        lazy: async () => {
          const { HomePage } = await import("../../pages/home");
          return {
            Component: HomePage,
          };
        },
      },
      {
        path: RootRoute.characters,
        hydrateFallbackElement: <h2>Loading characters page...</h2>,
        lazy: async () => {
          const { CharactersPage } = await import("../../pages/characters");
          return {
            Component: CharactersPage,
          };
        },
        loader: charactersLoader,
      },
      {
        path: RootRoute.character,
        hydrateFallbackElement: <h2>Loading character page...</h2>,
        lazy: async () => {
          const { CharacterPage } = await import("../../pages/character");
          return {
            Component: CharacterPage,
          };
        },
        loader: characterLoader,
      },
      {
        path: RootRoute.locations,
        hydrateFallbackElement: <h2>Loading locations page...</h2>,
        lazy: async () => {
          const { LocationsPage } = await import("../../pages/locations");
          return {
            Component: LocationsPage,
          };
        },
        loader: locationLoader,
      },
      {
        path: RootRoute.location,
        hydrateFallbackElement: <h2>Loading characters page...</h2>,
        lazy: async () => {
          const { LocationPage } = await import("../../pages/location");
          return {
            Component: LocationPage,
          };
        },
        loader: characterLoader,
      },
      {
        path: RootRoute.episodes,
        hydrateFallbackElement: <h2>Loading location page...</h2>,
        lazy: async () => {
          const { EpisodesPage } = await import("../../pages/episodes");
          return {
            Component: EpisodesPage,
          };
        },
        loader: episodesLoader,
      },
      {
        path: RootRoute.episode,
        hydrateFallbackElement: <h2>Loading episode page...</h2>,
        lazy: async () => {
          const { EpisodePage } = await import("../../pages/episode");
          return {
            Component: EpisodePage,
          };
        },
        loader: characterLoader,
      },
    ],
  },
  {
    path: RootRoute.login,
    hydrateFallbackElement: <h2>Loaded login form...</h2>,
    lazy: async () => {
      const { LoginPage } = await import("../../pages/login");
      return {
        Component: LoginPage,
      };
    },
  },
]);
