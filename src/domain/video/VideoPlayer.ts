import { PlaybackTime } from './PlaybackTime'

export class VideoPlayer {
  private constructor(
    readonly playbackTime: PlaybackTime,
    readonly isPlaying: boolean,
    readonly sourceUrl: VideoSourceUrl
  ) {}

  static new(sourceUrl: VideoSourceUrl): VideoPlayer {
    return new VideoPlayer(PlaybackTime.initial(), false, sourceUrl)
  }

  play(): VideoPlayer {
    return new VideoPlayer(this.playbackTime, true, this.sourceUrl)
  }

  pause(): VideoPlayer {
    return new VideoPlayer(this.playbackTime, false, this.sourceUrl)
  }

  timeupdate(current: PlaybackTime): VideoPlayer {
    return new VideoPlayer(current, this.isPlaying, this.sourceUrl)
  }
}

export class VideoSourceUrl {
  constructor(readonly value: string) {}
}
