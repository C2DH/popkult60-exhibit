import React from 'react'
import { get } from 'lodash'

const ImageContent = ({ objectConfig, document, goBig }) => {
  const imageUrl = get(document, "data.resolutions.medium.url", "");

  return (
    <>
      <img
        alt={objectConfig.caption ? objectConfig.caption : "Untitled."}
        src={imageUrl}
      />
    </>
  );
};

export default ImageContent
