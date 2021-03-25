import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Footer from './components/Footer'
import Logo from './components/Logo'
import MainBackground from './components/MainBackground'

import { initializeI18next } from './logic/language'

const { languageCode } = initializeI18next()

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
      <MainBackground />
      <Logo id="logo" />
      <AppRoutes startLanguageCode={languageCode} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
