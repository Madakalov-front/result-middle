import { IconAt } from "@tabler/icons-react";
import { Button } from "../../../shared/button";
import { FieldInput } from "../../../shared/field-input";
import { useSingInForm, type SingInType } from "../model";
import { useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../../../app/context/auth";

export const SignIn = () => {
  const { handleSubmit, register, isSubmitting, errors } = useSingInForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const onSubmit = (data: SingInType) => {
      login(data.nickname);
      
    navigate(state.from.pathname, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldInput
        label="Your nickname"
        placeholder="Your nickname"
        Icon={IconAt}
        {...register("nickname")}
        error={errors.nickname?.message}
      />
      <FieldInput
        label="Your password"
        placeholder="Your password"
        {...register("password")}
        error={errors.password?.message}
      />
      <Button children={isSubmitting ? "Отправка..." : "Войти"} type="submit" />
    </form>
  );
};
