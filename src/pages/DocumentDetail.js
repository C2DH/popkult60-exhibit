import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCachedDocument } from 'react-miller'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'react-feather'
import DocumentViewer from '../components/DocumentViewer'
import LangLink from '../components/LangLink'
import { useCurrentWindowDimensions } from '../hooks'
import { useStore } from '../store'
import '../styles/pages/DocumentDetail.scss'


const DocumentDetail = () => {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const { width, height } = useCurrentWindowDimensions()
  const [doc, {pending}] = useCachedDocument(id, {
    language: i18n.language,
  })

  useEffect(() => {
    useStore.setState({
      backgroundColor: 'var(--rich-black-FOGRA-29)',
      logoReduced: true
    });
  }, [])

  return (
    <div
      className="DocumentDetail position-relative h-100"
    >
      <LangLink
        to="/explorations/all"
        className="DocumentDetail_close d-flex align-items-center"
      >
        <ArrowLeft />
        <span className="ml-2 text-uppercase font-weight-bold">
          {t('all resources')}
        </span>
      </LangLink>
      {doc
        ? <DocumentViewer doc={doc} width={width} height={height}/>
        : <div>{pending}</div>
      }
    </div>
  )
}

export default DocumentDetail
