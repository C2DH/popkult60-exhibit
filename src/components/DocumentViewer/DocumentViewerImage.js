import React from 'react'
import ZoomAndPanMedia from '../ZoomAndPanMedia'

const DocumentViewerImage = ({ doc, height}) => {

  // const lowResolutionImage = doc.data.resolutions?.thumbnail?.url
  const highResolutionImage = doc.data.resolutions?.preview?.url

  return (
    <div className="DocumentViewerImage" style={{ height }}>
      <ZoomAndPanMedia src={highResolutionImage} />
    </div>
  )
}

export default DocumentViewerImage
