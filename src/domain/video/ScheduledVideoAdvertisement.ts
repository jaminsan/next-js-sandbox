import { PlaybackTime } from './PlaybackTime'
import { ActivationPeriod } from './ActivationPeriod'
import { VideoAdvertisementImageUrl } from './VideoAdvertisementImageUrl'
import { ActiveDuration } from './ActiveDuration'

export class ScheduledVideoAdvertisement {
  constructor(
    readonly activatedBetween: ActivationPeriod,
    readonly imageUrl: VideoAdvertisementImageUrl,
    readonly duration: ActiveDuration
  ) {}

  ready(playbackTime: PlaybackTime): boolean {
    return this.activatedBetween.included(playbackTime)
  }
}
