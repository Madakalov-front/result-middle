import { useCallback, useEffect, useState } from "react";

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type ReturnUseLocalStorage = [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  },
];

export const useLocalStorage = (key: string): ReturnUseLocalStorage => {
  const [value, setValue] = useState(() => localStorage.getItem(key));

  const setItem = useCallback(
    (value: LocalStorageSetValue) => {
      localStorage.setItem(key, value);
      setValue(value);
    },
    [key],
  );

  const removeItem = useCallback(() => {
    localStorage.removeItem(key);
    setValue(null);
  }, [key]);

  useEffect(() => {}, [setItem, removeItem]);

  return [value, { setItem, removeItem }];
};
