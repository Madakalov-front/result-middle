import {
  useActionState,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface AuthFormProps {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export interface AuthState {
  success: boolean;
  error: string | null;
}

const fakeRequest = async (_: AuthState, formData: FormData) => {
  await new Promise((res) => setTimeout(res, 1000));

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validUsers = [
    { email: "admin@test.com", password: "Admin123" },
    { email: "user@test.com", password: "User12345" },
  ];

  const isValidUser = validUsers.some(
    (user) => user.email === email && user.password === password,
  );

  if (isValidUser) {
    return {
      success: true,
      error: null,
    };
  }

  return {
    success: false,
    error: "Неверный email или пароль",
  };
};

export const AuthForm = ({ setIsAuth }: AuthFormProps) => {
  const [state, submitAction, isPending] = useActionState(fakeRequest, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (state.success) {
      setIsAuth(true);
    }
  }, [state.success, setIsAuth]);

  return (
    <form action={submitAction}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in…." : "Login"}
      </button>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.success && <p style={{ color: "green" }}>Успешный вход!</p>}
    </form>
  );
};
