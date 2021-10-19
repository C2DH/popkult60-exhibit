import React from 'react'
import { Menu } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { Container, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import Logo from './Logo'
import Panel from './Panel'
import LangLink from './LangLink'
import { PrimaryRoutes, TermsOfUseRoute } from '../constants'
import '../styles/components/HeaderMobile.scss'



const HeaderMobile = ({ width, height, panelName="menu" }) => {
  const history = useHistory()
  const { t } = useTranslation()
  const transform = (y) => `translate(0px,${y}px)`
  const [props, set] = useSpring(() => ({ y: -50, config: { mass: 1, tension: 50, friction: 10 } }))
  set({ y: 0 })
  const handleClick = () => {
    history.push({
      search: '?panel=' + panelName,
    })
    // block

  }
  return (
    <>
    <animated.header style={{
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      width,
      height:50,
      transform: props.y ? props.y.interpolate(transform) : null,
    }}>
      <Logo offsetTop={5} initialWidth={270} offsetLeft={12}/>
      </animated.header>
      <div className="position-fixed HeaderMobile_toggler" onClick={handleClick}>menu <Menu size={13}/></div>
      <Panel width={width} height="100%" name={panelName} left color="var(--white)">
        <div className="pointer-events-none" style={{height: 70}}>
          <Logo initialWidth={200} offsetTop={15} offsetLeft={(width - 180) / 2} fill="var(--white)"/>
        </div>
        <ul style={{listStyleType: 'none', paddingLeft:0}}>
          {PrimaryRoutes.concat([TermsOfUseRoute]).map((route,k) => (
            <li key={k} className="border-top border-white py-2" style={{paddingLeft:50}}>
              <h2 className="m-0 p-0">
                <LangLink to={route.to} className="text-white">
                  {t(route.label)}
                </LangLink>
              </h2>
              {route.description? <p className="text-white m-0" style={{paddingRight:50, opacity: .6}}>{t(route.description)}</p>: null}
            </li>
          ))}
        </ul>
      </Panel>
    </>
  )
}

export default HeaderMobile
