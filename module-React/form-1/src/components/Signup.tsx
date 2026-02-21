import { Button } from "../shared/button";
import { FieldInput } from "../shared/field-input";

export interface SignupProps {
  onSubmit: (data: FormData) => void;
}

export const Signup = ({ onSubmit }: SignupProps) => {
  const handleSubmit = (data: FormData) => {
    onSubmit(data);
  };
  return (
    <form action={handleSubmit}>
      <FieldInput label="Ваше имя" placeholder="Ваше имя" name="name" />
      <FieldInput
        label="Ваш никнейм"
        placeholder="Ваш никнейм"
        variant="filled"
        name="nuckname"
      />
      <FieldInput
        label="Ваша почта"
        placeholder="Ваша почта"
        variant="unstyled"
        name="email"
      />
      <FieldInput label="Мужской" type="radio" name="gender" />
      <FieldInput label="Женский" type="radio" name="gender" />
      <FieldInput
        label="Пароль"
        placeholder="Придумайте пароль"
        name="password"
      />
      <FieldInput
        label="Повторите пароль"
        placeholder="Повторите пароль"
        error="Не совпадает"
        name="confirmPassword"
      />
      <Button children={"Зарегистрироваться"} type="submit" />
    </form>
  );
};
