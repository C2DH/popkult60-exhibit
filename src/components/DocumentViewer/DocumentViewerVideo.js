import React from 'react'
import Video from '../Video'

const DocumentViewerVideo = ({ doc, height}) => {
  const videoUrl = doc.data.streamingUrl
  if(!videoUrl) {
    console.error('Video not valid, doc data must contain a streamingUrl')
    return null
  }
  return (
    <div className="DocumentViewerVideo" style={{ backgroundColor: 'black', height: height, paddingTop: 100 }}>
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
