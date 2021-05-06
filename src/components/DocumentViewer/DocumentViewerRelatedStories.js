import React from 'react'
import {useStories} from '@c2dh/react-miller'
import { useTranslation } from 'react-i18next'
import LangLink from '../LangLink'

const DocumentViewerRelatedStories = ({ doc }) => {
  const { i18n, t } = useTranslation()
  // eslint-disable-next-line no-unused-vars
  const [stories, pagination, { error }] = useStories({
    filters: {documents__pk: doc.id }
  }, {
    language: i18n.language.split('-').join('_'),
    defaultLanguage: i18n.options.defaultLocale,
  })
  if (error) {
    console.error(error)
  }

  if(!Array.isArray(stories)) {
    return (
      <div className="DocumentViewerRelatedStories">
        ...
      </div>
    )
  } else if (!stories.length) {
    return (
      <div className="DocumentViewerRelatedStories" dangerouslySetInnerHTML={{
        __html: t('documentRelatedStoriesNotFound')
      }} />
    )
  }
  console.info('DocumentViewerRelatedStories', stories)
  return (
    <div className="DocumentViewerRelatedStories">
      <label className="mb-0 d-block">
        <small>{t('documentRelatedStories')}</small>
      </label>

      {Array.isArray(stories) && stories.map((story) => (
        <div key={story.slug} className="card bg-transparent border-white border p-0 mt-2">
          <div className="card-body py-1 px-3">
            <blockquote className="blockquote mb-0">
              <LangLink className="d-block" to={`story/${story.slug}`}>
                {story.data.title}
              </LangLink>
              <small className="text-white">{story.data.abstract}</small>
            </blockquote>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DocumentViewerRelatedStories
