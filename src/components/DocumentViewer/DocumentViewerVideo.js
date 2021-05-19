import React from 'react'
import Video from '../Video'
import { get } from 'lodash'

const DocumentViewerVideo = ({ doc, height, paddingTop=100}) => {
  const videoUrl = doc.data.streamingUrl
  if(!videoUrl) {
    console.error('Video not valid, doc data must contain a streamingUrl')
    return null
  }
  const backgroundImage = get(doc, 'data.resolutions.preview.url', false)

  return (
    <div className="DocumentViewerVideo" style={{ minHeight: height, paddingTop }}>
      <Video
        url={videoUrl}
        backgroundImage={backgroundImage}
        width="auto"
        height={height}
        tracks={doc.data.subtitles}
      />
    </div>
  )
}

export default DocumentViewerVideo
