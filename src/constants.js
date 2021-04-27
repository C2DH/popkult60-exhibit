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

export const BBoxJunglinster = [[6.056213,49.637843],[6.453094,49.766187]]
export const BBoxVillaLouvigny = [[6.110930,49.606552],[6.134062,49.615868]]
export const BBoxFelsberg = [[6.573944,49.241138],[6.805687,49.327807]]
export const BBoxWesternEurope = [[-13.095703,40.580585],[16.787109,56.992883]]
export const BBoxSweden = [[-8.173828,53.120405],[41.528320,66.757250]]
export const BBoxCzechoslovakia = [[11.271973,47.368594],[23.532715,51.556582]]
export const BBoxLuxembourg	= [[4.682922,49.088258],[7.575073,50.348966]]
export const BBoxHollywood = [[-119.242859,33.399345],[-117.270813,34.459013]]
export const BBoxLuxembourgTheatre = [[6.115265,49.610293],[6.142945,49.621582]]
export const BBoxLargeEurope = [[-18.105469,31.653381],[35.507813,62.915233]]

export const BBoxIndochine	=[[88.813477,7.885147],[116.982422,24.647017]]
export const BBoxDinard	=[[-6.190796,47.148634],[1.691895,49.876938]]
export const BBoxParis	=[[1.274414,48.343472],[3.414001,49.249879]]
export const BBoxDusseldorf	=[[6.477127,51.077645],[7.128067,51.313447]]
export const BBoxDortmund	=[[7.285652,51.449300],[7.637901,51.567040]]
export const BBoxDuisburg	=[[6.619263,51.365350],[6.910744,51.492713]]
export const BBoxBurgWaldeck	=[[8.645725,48.633703],[8.816013,48.702178]]
export const BBoxClermontFerrand	=[[2.367554,45.432190],[3.810883,45.996008]]
export const BBoxMulheim	=[[6.663895,51.338334],[7.076569,51.496775]]

export const ThemeMagPilote = { slug: 'the-asterix-phenomenon' }
export const ThemeMagTv = { slug: 'childrens-television-series' }
export const ThemePlatine = {
  slug: 'le-deserteur-de-boris-vian',
  bboxes: [
    BBoxIndochine,
    BBoxDinard,
    BBoxParis,
    BBoxDusseldorf,
    BBoxDortmund,
    BBoxDuisburg,
    BBoxBurgWaldeck,
    BBoxParis,
    BBoxClermontFerrand,
    BBoxMulheim
  ],
}
export const ThemePoster = { slug: 'jugendmedien-ensemble-europa' }
export const ThemeRadio = {
  slug: 'radio-luxembourg',
  bboxes: [
    BBoxJunglinster,
    BBoxVillaLouvigny,
    BBoxFelsberg,
    BBoxWesternEurope,
    BBoxSweden,
    BBoxCzechoslovakia,
    BBoxLuxembourg,
    BBoxHollywood,
    BBoxWesternEurope,
    BBoxLuxembourgTheatre,
    BBoxLargeEurope,
    BBoxVillaLouvigny
  ]
}
export const ThemeRetro = { slug: 'des-excursions-du-dimanche-a-la-coupe-du-monde-1' }
export const ThemeTv = { slug: 'german-and-french-television-entertainment' }

export const Themes = [
  ThemeMagPilote, ThemeMagTv, ThemePlatine,
  ThemePoster, ThemeRadio, ThemeRetro, ThemeTv
]
