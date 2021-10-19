import React from 'react'
import LangLink from './LangLink'
import '../styles/components/HomeThemesLoopMobile.scss'

const HomeThemesLoopMobile = ({ themes, loading, className }) => {

  return (
    <ul className={`HomeThemesLoopMobile ${className}`}>
      {themes.map((theme,i) => (
        <li key={i}>
          <h2>
            <LangLink to={`story/${theme.slug}`}>{theme.data?.title}</LangLink>
          </h2>
          <blockquote>
            <span>{theme.data?.abstract}</span>
          </blockquote>
        </li>
      ))}
    </ul>
  )
}

export default HomeThemesLoopMobile
