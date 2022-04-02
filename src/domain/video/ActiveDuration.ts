export class ActiveDuration {
  private constructor(readonly value: number) {}

  static short(): ActiveDuration {
    return new ActiveDuration(10)
  }

  static middle(): ActiveDuration {
    return new ActiveDuration(30)
  }

  static long(): ActiveDuration {
    return new ActiveDuration(60)
  }
}
