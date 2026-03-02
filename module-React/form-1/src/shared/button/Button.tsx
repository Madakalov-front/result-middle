import type { ReactNode } from "react";

export interface ButtonProps {
  type?: "submit" | "button";
  children: ReactNode;
}

export const Button = ({ type = "button", children }: ButtonProps) => {
  return <button type={type}>{children}</button>;
};
