const ObjectContentImage = ({
  objectConfig, document, style, className='', goBig=false,
  objectPosition='right',
  ...props
}) => {
  if(!document) {
    return null
  }
  return (
    <div {...props} className={`ObjectContentImage ${className} ${objectPosition === 'right' ? 'text-right': 'text-left'} mb-5`}>
      <img
        alt={document.data.title ? document.data.title : ""}
        src={document.data.resolutions.medium.url}
        style={{
          height: style.height,
          width: style.width,
          objectFit: 'contain',
          objectPosition,
        }}
      />
      <figcaption className="p-2 small">
      {document.data.title} {document.data.year}
      </figcaption>
    </div>
  );
}

export default ObjectContentImage
