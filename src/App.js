import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { useCurrentWindowDimensions } from './hooks'
import { initializeI18next } from './logic/language'

const { languageCode } = initializeI18next()

const Header = React.lazy(() => import('./components/Header'));
const HeaderMobile = React.lazy(() => import('./components/HeaderMobile'))

const App = () => {
  const { width, height, isMobile } = useCurrentWindowDimensions({ immediate: true })
  if (isMobile === null) {
    return null;
  }
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
      <ScrollToTop />
      <Suspense fallback={null}>
      {isMobile
        ? <HeaderMobile width={width} height={height} />
        : <Header />
      }
      </Suspense>
      <AppRoutes
        width={width} height={height}
        isMobile={isMobile}
        startLanguageCode={languageCode}
      />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
