import React from 'react'
import Video from '../Video'

const DocumentViewerVideo = ({ doc, height, paddingTop=100}) => {
  const videoUrl = doc.data.streamingUrl
  if(!videoUrl) {
    console.error('Video not valid, doc data must contain a streamingUrl')
    return null
  }
  return (
    <div className="DocumentViewerVideo" style={{ height, paddingTop }}>
      <Video
        url={videoUrl}
        width="auto"
        height={height}
        tracks={doc.data.subtitles}
      />
    </div>
  )
}

export default DocumentViewerVideo
