import { MutableRefObject, useLayoutEffect, useRef } from "react";

const useIsMounted = (): Readonly<MutableRefObject<boolean>> => {
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};

export { useIsMounted };
