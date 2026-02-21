import { IconAt } from "@tabler/icons-react";
import { Button } from "../shared/button";
import { FieldInput } from "../shared/field-input";

export interface SinginProps {
  onSubmit: (data: FormData) => void;
}

export const Signin = ({ onSubmit }: SinginProps) => {
  const handleSubmit = (data: FormData) => {
    onSubmit(data);
  };
  return (
    <div>
      <form action={handleSubmit}>
        <FieldInput
          label="Your email"
          placeholder="Your email"
          Icon={IconAt}
          name="email"
        />
        <FieldInput
          label="Your password"
          placeholder="Your password"
          name="password"
        />
        <Button children={"Войти"} type="submit" />
      </form>
    </div>
  );
};
