import { PlaybackTime } from './PlaybackTime'
import { ScheduledVideoAdvertisement } from './ScheduledVideoAdvertisement'
import { ActiveVideoAdvertisement } from './ActiveVideoAdvertisement'

export class VideoAdvertisementSchedule {
  constructor(readonly advertisements: ScheduledVideoAdvertisement[]) {}

  arrangeReady(
    playbackTime: PlaybackTime
  ): [VideoAdvertisementSchedule, ActiveVideoAdvertisement | null] {
    const adReady = this.advertisements.find((ad) => ad.ready(playbackTime))

    if (adReady) {
      return [
        new VideoAdvertisementSchedule(
          this.advertisements.filter((a) => a !== adReady)
        ),
        new ActiveVideoAdvertisement(
          playbackTime,
          adReady.imageUrl,
          adReady.duration
        ),
      ]
    } else {
      return [this, null]
    }
  }

  static empty(): VideoAdvertisementSchedule {
    return new VideoAdvertisementSchedule([])
  }
}
