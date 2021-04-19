import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCurrentWindowDimensions } from '../hooks'
import '../styles/pages/Home.scss'
import HomeRoom from '../components/HomeRoom'
import HomeThemesLoop from '../components/HomeThemesLoop'
import { useStore } from '../store'
import { useStories } from '@c2dh/react-miller'
import { Themes } from '../constants'


const Home = () => {
  const { i18n } = useTranslation()
  const { width, height } = useCurrentWindowDimensions()
  const [themeSelected, setThemeSelected ] = useState()
  const [stories, pagination, { error }] = useStories({
    filters: {tags__slug: 'chapter' }
  }, {
    language: i18n.language.split('-').join('_'),
    defaultLanguage: i18n.options.defaultLocale,
  })
  useEffect(() => {
    useStore.setState({
      // var(--rich-black-FOGRA-29)
      color: '#121821',
      backgroundColor: 'var(--white)',
      logoReduced: false
    });
  }, [])
  const onThemeChanged = (alias) => {
    console.info('@onThemeChanged', alias)
    setThemeSelected(alias)
  }
  const themes = stories
    ? Themes.map(d => {
      const story = stories.find((e) => e.slug === d.slug);
      if (story) {
        return story
      }
      return d
    })
    : Themes

  console.info("Home rendering: themes", themes, pagination, error)
  return (
    <div className="Home">
    <HomeRoom width={width} height={height} themeSelected={themeSelected} onThemeChanged={onThemeChanged}/>
    <HomeThemesLoop width={width} height={height} themes={themes} themeSelected={themeSelected} onThemeChanged={onThemeChanged}/>
    </div>
  )
}

export default Home
