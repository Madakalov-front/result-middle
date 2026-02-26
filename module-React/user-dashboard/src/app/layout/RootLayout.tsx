import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <>
      <header>
        <h2>что-то в заголовке</h2>
      </header>
      <main style={{marginBlock: '30px'}}>
        <Outlet />
      </main>
      <footer><h2>что-то в подвале</h2></footer>
    </>
  );
};
