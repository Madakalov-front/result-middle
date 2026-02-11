import { useEffect, useRef, useState } from "react";

export const useHover = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const handleHover = () => setHovered(true);
      const handleOut = () => setHovered(false);

      element.addEventListener("mouseenter", handleHover);
      element.addEventListener("mouseout", handleOut);
      return () => {
        element.removeEventListener("mouseenter", handleHover);
        element.removeEventListener("mouseout", handleOut);
      };
    }
  }, []);

  return {
    hovered,
    ref,
  };
};
