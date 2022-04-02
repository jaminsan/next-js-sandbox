import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import PlayerOptions = videojs.PlayerOptions
import throttle from 'just-throttle'

export type VideoPlayerProps = {
  src: string
  seek: {
    forwardSeconds: number
    backwardSeconds: number
  }
  onPlay: () => void
  onPause: () => void
  onTimeUpdate: (currentPlaybackTimeSeconds: number) => void
}

const VideoPlayer: React.VFC<VideoPlayerProps> = (props) => {
  const videoElementRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoElementRef.current) {
      videojs(videoElementRef.current, playerOptions(props.seek), function () {
        this.src(props.src)

        this.on('play', props.onPlay)

        this.on('pause', props.onPause)

        this.on('timeupdate', () => props.onTimeUpdate(this.currentTime()))
      })
    }
  }, [videoElementRef])

  return (
    <div style={playerContainerStyle}>
      <video
        ref={videoElementRef}
        className="video-js vjs-default-skin vjs-big-play-centered"
        style={playerStyle}
      />
    </div>
  )
}

const playerOptions = (seek: {
  forwardSeconds: number
  backwardSeconds: number
}) => {
  return {
    controls: true,
    bigPlayButton: true,
    liveui: true,
    preload: 'none',
    muted: false,
    autoplay: false,
    loop: false,
    controlBar: {
      volumePanel: true,
      playToggle: true,
      fullscreenToggle: true,
      playbackRateMenuButton: true,
      progressControl: true,
      remainingTimeDisplay: false,
      liveDisplay: true,
    },
    userActions: {
      // @ts-ignore
      // https://github.com/videojs/video.js/pull/7495
      click: true,
    },
    plugins: {
      seekButtons: {
        forward: seek.forwardSeconds,
        back: seek.backwardSeconds,
      },
    },
  } as PlayerOptions
}

const playerContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
}

const playerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}

export default VideoPlayer
