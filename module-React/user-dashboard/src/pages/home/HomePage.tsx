import { Link } from "react-router";

export const HomePage = () => {
  return (
    <>
      <div>Hiiii!</div>
      <p>
        Если не авторизованы, пройдите <Link to="/login">авторизацию</Link>
      </p>
    </>
  );
};
