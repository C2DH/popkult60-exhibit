import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import get from 'lodash/get'

const MetadataFields = [
  { label: 'documentDataCreator', key: 'data.creator' },
  { label: 'documentDataSourceIdentifier', key: 'data.source.identifier'},
  { label: 'documentDataPublisher', key: 'data.publisher'},
  { label: 'documentDataProvenance', key: 'data.provenance'},
  { label: 'documentCopyright', key: 'copyright'}
]

const DocumentViewerMetadata = ({ doc }) => {
  const { t } = useTranslation()
  const contents = useMemo(() => {
    return MetadataFields
      .map((d) => ({ ...d, value: get(doc, d.key) }))
  }, [doc])

  return (
    <div className="DocumentViewerMetadata">
      {contents.map((d, i) => (
        d.value
          ? <div key={i}>
              <label className="mb-0"><small>{t(d.label)}</small></label>
              <p className="font-weight-bold">{d.value}</p>
            </div>
          : null
      ))}
    </div>
  )
}

export default DocumentViewerMetadata
