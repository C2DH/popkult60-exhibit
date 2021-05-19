import { Container, Row, Col, Nav } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import LangLink from './LangLink'
import { useNolangLocation } from '../hooks'
import {
  HomeRoute,
  AboutRoute,
  TermsOfUseRoute
} from '../constants'
import '../styles/components/Footer.scss'

const now = new Date()

const Footer = () => {
  const { t } = useTranslation()
  const { activeRoute } = useNolangLocation()
  return (
    <footer className="Footer w-100">
    <Container className="pt-5">
      <Row>
        <Col>Copyright © <a href="https://www.uni.lu/">University of Luxembourg</a> {now.getFullYear()}</Col>
        <Col>
          <Nav className="justify-content-end">
            {[HomeRoute, AboutRoute, TermsOfUseRoute].map((route, i) => {
              return (
                <LangLink key={i} className={route.to === activeRoute? 'active' : null}
                  to={route.to}
                >
                  {t(route.label)}
                </LangLink>
              )
            })}
          </Nav>
        </Col>
      </Row>
    </Container>
    </footer>
  )
}

export default Footer
