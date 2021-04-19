export const HomeRoute = { to:'/', label: 'navigationHome'}
export const CollectionRoute = { to: '/collection', label: 'navigationCollection' }
export const StoriesRoute = { to: '/stories', label: 'navigationStories' }
export const AboutRoute = { to: '/about', label: 'navigationAbout' }
export const TermsOfUseRoute = Object.freeze({ to:'/terms-of-use', label: 'navigationTermsOfUse'})
export const PrimaryRoutes = [
  HomeRoute,
  CollectionRoute,
  AboutRoute
]

export const Languages = (process.env.REACT_APP_LANGUAGES ?? 'en-GB,fr-FR,de-DE').split(',')
export const LanguageCodes = Languages.map((l) => l.split('-')[0])
export const LanguageRoutePattern = `/:lang(${LanguageCodes.join('|')})`
export const DefaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE ?? 'en-GB'
export const DefaultLanguageCode = DefaultLanguage.split('-')[0]

export const ThemeRadio = { slug: 'radio-luxembourg' }
export const ThemePlatine = { slug: 'le-deserteur-de-boris-vian' }
export const ThemeMagPilote = { slug: 'the-asterix-phenomenon-changes-in-comics-forma' }
export const ThemePoster = { slug: 'poster' }
export const ThemeRetro = { slug: 'retro' }
export const ThemeTv = { slug: 'akk-theme' }
export const ThemeMagTv = { slug: 'magTv' }
