import React, { useEffect } from 'react'

import 'video.js/dist/video-js.min.css'
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css'
import VideoPlayer from './VideoPlayer'
import { useVideoPageHook } from './VideoPage.hook'
import { PlaybackTime } from '../../domain/video/PlaybackTime'
import Advertisement from './Advertisement'

require('videojs-seek-buttons')

export type PlayerPageProps = {
  videoId: string
}

const VideoPage: React.VFC<PlayerPageProps> = (props) => {
  const {
    loadVideo,
    videoPlayer,
    startVideo,
    pauseVideo,
    timeupdateVideo,
    advertisement,
    closeAdvertisement,
  } = useVideoPageHook(props.videoId)

  useEffect(() => {
    loadVideo()
  }, [])

  const handleOnStartVideo = () => {
    startVideo()
  }

  const handleOnPauseVideo = () => {
    pauseVideo()
  }

  const handleOnTimeUpdateVideo = (currentPlaybackTimeSeconds: number) => {
    timeupdateVideo(PlaybackTime.fromSeconds(currentPlaybackTimeSeconds))
  }

  const handleOnClickAdvertisementClose = () => {
    // close しても復活してまう
    closeAdvertisement()
  }

  return (
    <div style={containerStyle}>
      {videoPlayer && (
        <div style={playerLayout}>
          <VideoPlayer
            src={videoPlayer.sourceUrl}
            seek={videoPlayer.seek}
            onPlay={handleOnStartVideo}
            onPause={handleOnPauseVideo}
            onTimeUpdate={handleOnTimeUpdateVideo}
          />
        </div>
      )}
      {advertisement && (
        <div style={advertisementLayout}>
          <Advertisement
            imageUrl={advertisement.imageUrl}
            onClose={handleOnClickAdvertisementClose}
          />
        </div>
      )}
    </div>
  )
}

const containerStyle: React.CSSProperties = {
  position: 'relative',
}

const playerLayout: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}

const advertisementLayout: React.CSSProperties = {
  position: 'absolute',
  bottom: '40px',
  right: '32px',
}

export default VideoPage
