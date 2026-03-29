
export const getPage = (request: Request) => {
  const url = new URL(request.url);
  return Number(url.searchParams.get("page") ?? 1);
};
