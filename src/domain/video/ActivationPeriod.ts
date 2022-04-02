import { PlaybackTime } from './PlaybackTime'

export class ActivationPeriod {
  constructor(readonly from: PlaybackTime, readonly to: PlaybackTime) {}

  included(current: PlaybackTime): boolean {
    return this.from.value <= current.value && current.value <= this.to.value
  }
}
