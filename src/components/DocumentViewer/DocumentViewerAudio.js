import React from 'react'
import Video from '../Video'
import { get } from 'lodash'

const DocumentViewerAudio = ({ doc, height, paddingTop=100}) => {
  const videoUrl = doc?.data?.streamingUrl
  if(!videoUrl) {
    console.error('Video not valid, doc data must contain a streamingUrl')
    return null
  }
  const backgroundImage = get(doc, 'data.resolutions.preview.url', false)
  const availableHeight = 100
  const controlsAvailableHeight = 50
  return (
    <div className="DocumentViewerAudio" style={{ minHeight: availableHeight, paddingTop }}>
      <div className="px-2 bg-dark">
        <div style={{backgroundColor: 'var(--dark)',height: controlsAvailableHeight, backgroundImage: `url(${backgroundImage})`,
            backgroundSize : 'cover',
            backgroundPosition: 'center'
        }} />
      </div>
      <Video
        url={videoUrl}
        width={"auto"}
        height={controlsAvailableHeight}
        tracks={doc.data.subtitles}
      />
    </div>
  )
}

export default DocumentViewerAudio
