import React, { useState, useEffect } from 'react'
import {Container, Col, Row} from 'react-bootstrap'
import LangLink from './LangLink'
import Logo from './Logo'
import { useStore } from '../store'
import '../styles/components/Header.scss'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  HomeRoute,
  CollectionRoute,
  AboutRoute,
  Languages,
} from '../constants'

const HeaderLink = ({ to, children, active, activeColor, color, onClick, forceLanguage=null, }) => {
  return (
    <LangLink className={`Header_HeaderLink ${active ? 'active' : ''}`}
      forceLanguage={forceLanguage}
      onClick={onClick}
      to={to} style={{
        borderRadius: '1rem',
      }}
    >{children}</LangLink>
  )
}

const Header = () => {
  const location = useLocation()
  const { pathname } = location
  const { t, i18n } = useTranslation()
  const [activeRoute, setActiveRoute] = useState('')
  const { color, activeColor, logoColor, logoActiveColor, logoReduced } = useStore((state) => state);
  useEffect(() => {
    // get rid of language prefix
    const route = `/${pathname.split('/').slice(2).join('/')}`
    if (route.indexOf('/story/') !== -1) {
      // substory
      console.info('location has story prefix:', route)
    }
    setActiveRoute(route)
  }, [pathname]);

  return (
    <header className="Header w-100">
      <Container>
        <Row>
          <Col>
            <Logo id="logo"
              logoReduced={activeRoute !== '/'}
              logoColor={logoColor}
              logoActiveColor={logoActiveColor}
              width={activeRoute === '/' ? 450 : 250}
            />
          </Col>
          <Col md={{span:4}}>
            <div className="Header_menuGroup d-flex justify-content-center">
              <HeaderLink to={HomeRoute.to}
                active={activeRoute === HomeRoute.to}
                {... {color, activeColor}}
              >{t(HomeRoute.label)}</HeaderLink>
              <HeaderLink to={CollectionRoute.to}
                active={activeRoute === CollectionRoute.to || activeRoute.indexOf('/doc/') !== -1 }
                {... {color, activeColor}}
              >{t(CollectionRoute.label)}</HeaderLink>
            </div>
          </Col>
          <Col>
            <div className="Header_menuGroup d-flex justify-content-end">
            {[AboutRoute].map((d,i) => (
              <HeaderLink to={d.to} key={i}
                active={activeRoute === d.to}
                {... {color, activeColor}}
              >{t(d.label)}</HeaderLink>
            ))}
            {Languages.map((lang, i) => (
              <HeaderLink key={i} forceLanguage={lang.split('-')[0]} to={activeRoute}
                active={lang === i18n.language}
                {... {color, activeColor}}
                onClick={(e) => {
                  i18n.changeLanguage(lang)
                }}>{lang.split('-')[0]}</HeaderLink>
            ))}
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header
