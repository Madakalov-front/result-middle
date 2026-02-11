import { useViewportSize } from "../shared/hooks/useViewportSize";

export const Demo = () => {
  const { width, height } = useViewportSize();

  return (
    <>
      Width: {width}, height: {height}
    </>
  );
};
