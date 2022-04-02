import { useEffect, useState } from 'react'
import * as VidePort from '../../port/videoPort'
import { PlaybackTime } from '../../domain/video/PlaybackTime'
import { VideoAdvertisementSchedule } from '../../domain/video/VideoAdvertisementSchedule'
import { VideoPlayer } from '../../domain/video/VideoPlayer'
import * as AdvertisementPort from '../../port/advertisementPort'
import { ActiveVideoAdvertisement } from '../../domain/video/ActiveVideoAdvertisement'

export const usePlayerPageHook: (videoId: string) => {
  loadVideo: () => Promise<void>
  videoPlayer: {
    sourceUrl: string
    seek: { backwardSeconds: number; forwardSeconds: number }
  } | null
  startVideo: () => void
  pauseVideo: () => void
  timeupdateVideo: (current: PlaybackTime) => void
  advertisement: { image: string } | null
  closeAdvertisement: () => void
} = (videoId: string) => {
  const [videoPlayer, setVideoPlayer] = useState<
    VideoPlayer | null | undefined
  >(null)
  const [advertisementSchedule, setAdvertisementSchedule] = useState(
    VideoAdvertisementSchedule.empty
  )

  const loadVideo = async () => {
    const [v, ad] = await Promise.all([
      VidePort.findById(videoId),
      AdvertisementPort.findByVideoId(videoId),
    ])
    if (v) {
      setVideoPlayer(v)
      setAdvertisementSchedule(ad)
    }
  }

  const startVideo = () => {
    setVideoPlayer((prev) => prev?.play())
  }

  const pauseVideo = () => {
    setVideoPlayer((prev) => prev?.pause())
  }

  const [advertisement, setAdvertisement] =
    useState<ActiveVideoAdvertisement | null>(null)

  const timeupdateVideo = (playbackTime: PlaybackTime) => {
    setVideoPlayer((prev) => prev?.timeupdate(playbackTime))
  }

  useEffect(() => {
    // activate ad
    if (advertisement == null && videoPlayer?.isPlaying) {
      const [adSchedule, mayBeAd] = advertisementSchedule.arrangeReady(
        videoPlayer.playbackTime
      )
      if (mayBeAd) {
        setAdvertisement(mayBeAd)
        setAdvertisementSchedule(adSchedule)
      }
    }

    // gc ad
    if (advertisement && videoPlayer?.isPlaying) {
      if (advertisement.gone(videoPlayer.playbackTime)) {
        setAdvertisement(null)
      }
    }
  }, [videoPlayer, advertisementSchedule, advertisement])

  const closeAdvertisement = () => {
    setAdvertisement(null)
  }

  return {
    loadVideo,
    videoPlayer: videoPlayer
      ? {
          sourceUrl: videoPlayer.sourceUrl.value,
          seek: { forwardSeconds: 15, backwardSeconds: 15 },
        }
      : null,
    startVideo,
    pauseVideo,
    timeupdateVideo,
    advertisement: advertisement
      ? { image: advertisement.imageUrl.value }
      : null,
    closeAdvertisement,
  }
}
