import { VideoPlayer, VideoSourceUrl } from '../domain/video/VideoPlayer'

export const findById = async (id: string): Promise<VideoPlayer | null> => {
  const v = videoSources
    .filter((v) => v.id === id)
    .map((v) => VideoPlayer.new(new VideoSourceUrl(v.url)))
  return v.length > 0 ? v[0] : null
}

const videoSources = [
  {
    id: 'live',
    url: 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
  },
  {
    id: 'vod',
    url: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8',
  },
]
