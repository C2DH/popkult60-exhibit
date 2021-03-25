import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import {
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Minimize2,
} from 'react-feather'
import '../styles/components/DocumentViewerPdf.scss'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const ZoomScaleStep = 0.2

const DocumentViewerPdf = ({ doc, height }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1)
  const zoomInScale = useCallback(
    () => setScale((s) => s + ZoomScaleStep),
    []
  )
  const zoomOutScale = useCallback(
    () => setScale((s) => s - ZoomScaleStep),
    []
  )
  const resetScaleZoom = useCallback(() => setScale(1), [])

  const [containerHeight, setContainerHeight] = useState(null)
  const pdfContainerRef = useRef()
  useEffect(() => {
    setContainerHeight(pdfContainerRef.current.clientHeight)
  }, [])

  let pdfUrl = doc.attachment
  if (process.env.NODE_ENV !== 'production') {
    const baseUrlRegex = /http(s)?:\/\/([^/]+)/
    const baseUrl = `${window.location.protocol}//${window.location.host}`
    pdfUrl = pdfUrl.replace(baseUrlRegex, baseUrl)
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  function handlePageChange(e) {
    const pageNumber = e.target.value
    if (+pageNumber <= numPages) {
      setPageNumber(+pageNumber)
    }
  }
  return (
      <div className="DocumentViewerPdf" style={{ height }}>
        <div className="DocumentViewerPdf_container">
          <div ref={pdfContainerRef} className="DocumentViewerPdf_documentContainer">
            {containerHeight && (
              <Document
                className="DocumentViewerPdf_Document"
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  height={containerHeight}
                  scale={scale}
                  className="DocumentViewerPdf_Page shadow"
                  pageNumber={pageNumber || 1}
                />
              </Document>
            )}
          </div>
          <div className="DocumentViewerPdf_controls">
            <button
              onClick={() => setPageNumber((p) => p - 1)}
              disabled={pageNumber <= 1}
              className="btn btn-link btn-icon-round mr-2"
            >
              <ArrowLeft color="var(--primary)"></ArrowLeft>
            </button>
            <input
              className="page-input mr-2"
              type="number"
              onChange={handlePageChange}
              value={pageNumber}
              min="1"
              max={numPages}
              step="1"
            />
            {' of '}
            {numPages}
            <button
              onClick={() => setPageNumber((p) => p + 1)}
              disabled={pageNumber >= numPages}
              className="btn btn-link btn-icon-round ml-2"
            >
              <ArrowRight color="var(--primary)"></ArrowRight>
            </button>

            <button
              className="btn btn-link btn-icon-round ml-2"
              onClick={zoomInScale}
            >
              <ZoomIn color="var(--primary)"></ZoomIn>
            </button>
            <button
              className="btn btn-link btn-icon-round ml-2"
              onClick={zoomOutScale}
            >
              <ZoomOut color="var(--primary)"></ZoomOut>
            </button>
            <button
              className="btn btn-link btn-icon-round ml-2"
              onClick={resetScaleZoom}
            >
              <Minimize2 color="var(--primary)"></Minimize2>
            </button>
          </div>
        </div>
      </div>
  )
}

export default DocumentViewerPdf
