import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCurrentWindowDimensions } from '../hooks'
import '../styles/pages/Home.scss'
import HomeRoom from '../components/HomeRoom'
import HomeThemesLoop from '../components/HomeThemesLoop'
import { useStore } from '../store'
import { useStories } from '@c2dh/react-miller'


const Home = () => {
  const { i18n } = useTranslation()
  const { width, height } = useCurrentWindowDimensions()
  const [stories, pagination, { error }] = useStories({
    filters: {tags__slug: 'theme' }
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

  console.info("Home", stories, pagination, error)
  return (
    <div className="Home">
    <HomeRoom width={width} height={height} />
    <HomeThemesLoop width={width} height={height} themes={stories || []}/>
    </div>
  )
}

export default Home
