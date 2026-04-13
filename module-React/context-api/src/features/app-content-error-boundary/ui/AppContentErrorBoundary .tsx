import { isRouteErrorResponse, useRouteError } from "react-router";

export const AppContentErrorBoundary = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "Please try again later.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message =
      typeof error.data === "string"
        ? error.data
        : "Route error occurred while loading content.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <section>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};
