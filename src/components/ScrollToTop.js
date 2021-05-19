import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    console.info('ScrollToTop pathname', pathname, 'hash', hash)
    if ( hash === '' ) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop
