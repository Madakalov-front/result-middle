import { type ReactNode } from "react";

export const ContainerCard = ({ children }: { children: ReactNode[] }) => {
  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "8px 16px",
        listStyle: "none",
      }}
    >
      {children}
    </ul>
  );
};
