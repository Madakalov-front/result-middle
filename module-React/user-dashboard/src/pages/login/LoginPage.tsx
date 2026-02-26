import { Suspense, type FormEvent } from "react";
import { LOCAL_FLAG_AUTH, ROUTE } from "../../shared/constants";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    form.reset();

    localStorage.setItem(LOCAL_FLAG_AUTH, JSON.stringify(true));
    navigate(`${ROUTE.home}/${ROUTE.dashboard.root}`, { replace: true });
  };

  return (
    <Suspense fallback={<h1>Loading login page...</h1>}>
      <h1>Введите любые данные</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit"> отправить</button>
      </form>
    </Suspense>
  );
};
