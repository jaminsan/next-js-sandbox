import { PlaybackTime } from './PlaybackTime'
import { VideoAdvertisementImageUrl } from './VideoAdvertisementImageUrl'
import { ActiveDuration } from './ActiveDuration'

export class ActiveVideoAdvertisement {
  constructor(
    readonly activatedAt: PlaybackTime,
    readonly imageUrl: VideoAdvertisementImageUrl,
    readonly duration: ActiveDuration
  ) {}

  gone(playbackTime: PlaybackTime): boolean {
    const beforeActivated = playbackTime.value < this.activatedAt.value
    const afterDurationPassed =
      this.duration.value < playbackTime.value - this.activatedAt.value

    return beforeActivated || afterDurationPassed
  }
}
