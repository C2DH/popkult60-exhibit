import React, { Suspense, lazy, useEffect } from 'react'
import ReactGA from 'react-ga'
import { Switch, Route, Redirect, useRouteMatch, useLocation } from "react-router-dom"
import { QueryParamProvider } from 'use-query-params'
import AppRouteLoading from './pages/AppRouteLoading'
import { LanguageRoutePattern } from './constants'
import { useCurrentWindowDimensions } from './hooks'

/* Pages */
const Home = lazy(() => import('./pages/Home'))
const StaticPage = lazy(() => import('./pages/StaticPage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const DocumentDetail = lazy(() => import('./pages/DocumentDetail'))
const Collection = lazy(() => import('./pages/Collection'))
const Story = lazy(() => import('./pages/Story'))

/* Pages routing by language */
const LangRoutes = () => {
  const { path } = useRouteMatch()
  // const publicPath = `${process.env.PUBLIC_URL || ''}${path}`
  // console.info('publicPath', publicPath)
  const { width, height } = useCurrentWindowDimensions()
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Home width={width} height={height} />
      </Route>
      <Route exact path={`${path}/loading`}>
        <AppRouteLoading width={width} height={height} />
      </Route>
      <Route exact path={`${path}/about`}>
        <StaticPage id='about' width={width} height={height} />
      </Route>
      <Route exact path={`${path}/terms-of-use`}>
        <StaticPage id='terms-of-use' width={width} height={height} />
      </Route>
      <Route exact path={`${path}/doc/:id`}>
        <DocumentDetail width={width} height={height} />
      </Route>
      <Route exact path={`${path}/story/:id`}>
        <Story width={width} height={height} />
      </Route>
      <Route exact path={`${path}/collection`}>
        <Collection width={width} height={height} />
      </Route>
      <Route path={`${path}*`}>
        <NotFound />
      </Route>
    </Switch>
  )
}

const usePageViews = ({ enableGA }) => {
  let location = useLocation()

  useEffect(
    () => {
      const url = [location.pathname, location.search].join('')
      if (enableGA) {
        console.info('ReactGA.pageview:', url)
        ReactGA.pageview(url)
      } else {
        console.info('ReactGA.pageview disabled:', url)
      }
    },
    [location, enableGA]
  )
}

const AppRoutes = ({enableGA=false, startLanguageCode='en'}) => {
  usePageViews({ enableGA })
  return (
    <Suspense fallback={<AppRouteLoading/>}>
    <QueryParamProvider ReactRouterRoute={Route}>
    <Switch>
      <Redirect from="/" exact to={startLanguageCode} />
      <Route path={LanguageRoutePattern}>
        <LangRoutes />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
    </QueryParamProvider>
    </Suspense>
  )
}

export default AppRoutes
