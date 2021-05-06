import React, { useEffect } from 'react'
import { XCircle } from 'react-feather'
import { useSpring, animated } from 'react-spring'
import { useDocument } from '@c2dh/react-miller'
import { useTranslation } from 'react-i18next'
import DocumentViewer from './DocumentViewer'
import { useStore } from '../store'

const xTranslate = (x) => `translate3d(${x}px, 0px, 0px)`

const StoryCollectionDocumentViewer = ({ doc, height=0, width=0 }) => {
  const {i18n} = useTranslation()
  const [completeDocument, {pending}] = useDocument(doc.slug, {
    language: i18n.language,
  })
  console.info('StoryCollectionDocumentViewer', doc, completeDocument)
  return (
    <DocumentViewer doc={pending || !completeDocument ? doc: completeDocument} width={width} height={height}/>
  )
}

const StoryCollection = ({ height, width=0 }) => {
  const [{ x }, set] = useSpring(() => ({ x: -width }));
  const { documentFullscreen, closeDocumentFullScreen } = useStore((state) => state);

  const onClickHandler = () => {
    closeDocumentFullScreen()
  }

  useEffect(() => {
    console.info('StoryCollection sta cambiando')
    set({ x: documentFullscreen !== null ? 0: -width})
  })

  return (
    <animated.div className="StoryCollection" style={{
      position: 'fixed',
      top: 0,
      height,
      width,
      zIndex: 1,
      backgroundColor: 'var(--dark)',
      transform: x.interpolate(xTranslate),
      overflow: 'scroll'
    }}>
      <div style={{
        position:'fixed', top:100, right: 100, zIndex: 100
      }} onClick={onClickHandler}
      >
      <XCircle color="var(--white)" />
      </div>
      {documentFullscreen !== null && (
        <StoryCollectionDocumentViewer doc={documentFullscreen} width={width} height={height}/>
      )}
    </animated.div>
  )
}

export default StoryCollection
