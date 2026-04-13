import { type ReactNode } from "react";

export const ContainerCard = ({ children }: { children: ReactNode[] }) => {
  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        height: "100%",
        gap: "22px 32px",
        listStyle: "none",
      }}
    >
      {children}
    </ul>
  );
};
