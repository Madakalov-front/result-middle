export const RootRoute = {
  home: "/",
  characters: "/characters",
  character: "/character/:id",
  locations: "/locations",
  location: "/location/:id",
  episodes: "episodes",
  episode: "/episode/:id",
  login: "/login",

  characterPath: (id: number) => `/character/${id}`,
  locationPath: (id: number) => `/location/${id}`,
  episodePath: (id: number) => `/episode/${id}`,
} as const;
