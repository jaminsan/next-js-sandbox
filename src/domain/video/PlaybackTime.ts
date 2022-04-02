export class PlaybackTime {
  private constructor(readonly value: number) {}

  static initial(): PlaybackTime {
    return new PlaybackTime(0)
  }

  static fromSeconds(value: number): PlaybackTime {
    return new PlaybackTime(value)
  }
}
