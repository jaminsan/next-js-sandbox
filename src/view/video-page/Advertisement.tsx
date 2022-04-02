import React from 'react'

export type AdvertisementProps = {
  imageUrl: string
  onClose: () => void
}

const Advertisement: React.VFC<AdvertisementProps> = (props) => {
  return (
    <div style={advertisementStyle}>
      <div style={closeButtonLayout}>
        <CloseButton onClick={props.onClose} />
      </div>
      <div>
        <img style={imageStyle} src={props.imageUrl} alt="ad" />
      </div>
    </div>
  )
}

const advertisementStyle: React.CSSProperties = {
  height: '140px',
  width: '256px',
  padding: '8px',
  background: '#ffffff',
  borderRadius: '4px',
  boxShadow: '0 2px 4px #e4e4e4',
  borderLeft: '2px solid #ffffff',
  display: 'flex',
  flexDirection: 'column',
}

const imageStyle: React.CSSProperties = {
  objectFit: 'cover',
  width: '100%',
  height: '104px',
}

type CloseButtonProps = {
  onClick: () => void
}

const CloseButton: React.VFC<CloseButtonProps> = (props) => {
  return (
    <div style={closeButtonStyle} onClick={props.onClick}>
      <svg
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
      >
        <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
      </svg>
    </div>
  )
}

const closeButtonLayout: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row-reverse',
}

const closeButtonStyle: React.CSSProperties = {
  cursor: 'pointer',
}

export default Advertisement
