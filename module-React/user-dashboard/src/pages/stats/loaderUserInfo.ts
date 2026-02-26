export const loaderUserInfo = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!res.ok) throw new Response("Failed to load stats", { status: 500 });
  return res.json();
};
