export type VideoPlayerModel = {
  sourceUrl: string
  seek: {
    forwardSeconds: number
    backwardSeconds: number
  }
}

export type AdvertisementModel = {
  image: string
}
