import { useEffect, useRef } from "react";

/**
 * This hooks is used when you wants to not ru your effect when react render first time
 * @param callback callBack function when effect must run
 * @param dependencies array of dependencies which fire effect
 */
export const useDidMountEffect = (callback, dependencies) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback();
    } else {
      didMount.current = true;
    }
  }, dependencies);
};
