import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Footer from './components/Footer'
import { initializeI18next } from './logic/language'

const { languageCode } = initializeI18next()

const App = () => {
  return (
    <BrowserRouter>
    <main><AppRoutes startLanguageCode={languageCode}/></main>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
