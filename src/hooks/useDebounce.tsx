import { useEffect, useState } from "react";

export const useDebounce = (value: string) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounce(value)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [value])

  return debounce
}