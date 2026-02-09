"use client";
import { Suspense, use } from "react";

const userPromise = fetch(import.meta.env.VITE_API_URL).then((res) => {
  if (!res.ok) throw new Error("Такого пользователя нет");
  return res.json();
});

const UserData = () => {
  const user = use(userPromise);
  return <h1>Welcome back, {user.name}!</h1>;
};

export const WelcomeBack = () => {
  return (

    <Suspense fallback={<h1>Loading user...</h1>}>
      <UserData />
    </Suspense>
  );
};
