import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'

const getWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

const getHeight = () => window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

const getWindowDimensions = () => ({
  width: getWidth(),
  height: getHeight()
})
/*
  Based on
  https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
  consulted on 2021-02-26
*/
export function useCurrentWindowDimensions() {
  let [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      const dims = getWindowDimensions()
      timeoutId = setTimeout(() => setWindowDimensions(dims), 150);
      console.info('setWindowDimensions', dims)
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])
  return windowDimensions;
}
/*
  Based on https://gist.github.com/whoisryosuke/99f23c9957d90e8cc3eb7689ffa5757c
  consulted on 2021-02-26
  usage in components:
  const { x, y } = useMousePosition();
*/
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null, isValid: false });
  const updateMousePosition = ev => {
    if (!ev) {
      return
    }
    setMousePosition({ x: ev.clientX, y: ev.clientY, isValid: true });
  };
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
};

/*
  usage:
  ```
  const [{ width, height, windowDimensions }, ref] = useBoundingClientRect()
  // [...]
  <div ref={ref}>
  ```
*/
export const useBoundingClientRect = ({ accurate=false } = {}) => {
  const ref = useRef();
  const [bbox, setBbox] = useState({
    width: 0, height: 0, windowDimensions: '0x0',
    x: 0, y: 0,
    top: 0, right: 0, bottom: 0, left: 0,
  });
  const setCurrentBoundingClientRect = () => {
    const boundingClientRect = ref && ref.current
      ? ref.current.getBoundingClientRect()
      : { width: 0, height: 0, x: 0, y: 0, windowDimensions: '0x0' }
    const windowDimensions = accurate
      ? JSON.stringify(boundingClientRect)
      : `${boundingClientRect.width}x${boundingClientRect.height}`
    if (windowDimensions !== bbox.windowDimensions) {
      // extract one dimension by one dimension, the only way
      // as the result of el.getBoundingClientRect() returns a special object
      // of type ClientRect (or DomRect apparently)
      const {top, right, bottom, left, width, height, x, y} = boundingClientRect
      setBbox({
        top, right, bottom, left, width, height, x, y,
        windowDimensions,
      })
    }
  };
  useEffect(() => {
    let timer;
    const delaySetCurrentBoundingClientRect = () => {
      clearTimeout(timer)
      timer = setTimeout(setCurrentBoundingClientRect, 200)
    }
    delaySetCurrentBoundingClientRect()
    window.addEventListener('resize', delaySetCurrentBoundingClientRect)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', delaySetCurrentBoundingClientRect)
    }
  });
  return [bbox, ref];
};


export const useImage = (src, delay=1000) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasStartedInitialFetch, setHasStartedInitialFetch] = useState(false);

    useEffect(() => {
      setHasStartedInitialFetch(true);
      setError(false);
      setIsLoading(true);
      // Here's where the magic happens.
      const image = new Image();
      let timer1 = setTimeout(() => {
        image.src = src;
      }, delay);

      const handleError = (err) => {
          setError(true);
      };

      const handleLoad = () => {
        setIsLoading(false);
        setError(null);
      };

      image.onerror = handleError;
      image.onload = handleLoad;

      return () => {
        clearTimeout(timer1)
        image.removeEventListener("error", handleError);
        image.removeEventListener("load", handleLoad);
      };
    }, [src, delay]);

    return { isLoading, error, hasStartedInitialFetch };
};

// Hook
export const usePrevious = (value) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}


export const useNolangLocation = () => {
  const location = useLocation()
  const { pathname } = location
  const [activeRoute, setActiveRoute] = useState('')
  useEffect(() => {
    // get rid of language prefix
    const route = `/${pathname.split('/').slice(2).join('/')}`
    setActiveRoute(route)
  }, [pathname]);
  return { activeRoute }
}
