import { VideoAdvertisementSchedule } from '../domain/video/VideoAdvertisementSchedule'
import { PlaybackTime } from '../domain/video/PlaybackTime'
import { ScheduledVideoAdvertisement } from '../domain/video/ScheduledVideoAdvertisement'
import { ActivationPeriod } from '../domain/video/ActivationPeriod'
import { VideoAdvertisementImageUrl } from '../domain/video/VideoAdvertisementImageUrl'
import { ActiveDuration } from '../domain/video/ActiveDuration'

export const findByVideoId = async (
  videoId: string
): Promise<VideoAdvertisementSchedule> => {
  const s = schedules.find((s) => s.id === videoId)
  return s ? s.ad : VideoAdvertisementSchedule.empty()
}

const adScheduleForVod = new VideoAdvertisementSchedule([
  new ScheduledVideoAdvertisement(
    new ActivationPeriod(
      PlaybackTime.fromSeconds(10),
      PlaybackTime.fromSeconds(20)
    ),
    new VideoAdvertisementImageUrl(
      'https://pk-mn.com/image/news/2019/07/29/pokesen-saiyou-kikaku-pokemon-jikobunseki-4.jpg'
    ),
    ActiveDuration.short()
  ),
  new ScheduledVideoAdvertisement(
    new ActivationPeriod(
      PlaybackTime.fromSeconds(60),
      PlaybackTime.fromSeconds(70)
    ),
    new VideoAdvertisementImageUrl(
      'https://i.ytimg.com/vi/lLtLvpR1m94/maxresdefault.jpg'
    ),
    ActiveDuration.long()
  ),
])

const adScheduleForLive = new VideoAdvertisementSchedule([
  new ScheduledVideoAdvertisement(
    new ActivationPeriod(
      PlaybackTime.fromSeconds(40),
      PlaybackTime.fromSeconds(60)
    ),
    new VideoAdvertisementImageUrl(
      'https://pk-mn.com/image/news/2019/07/29/pokesen-saiyou-kikaku-pokemon-jikobunseki-4.jpg'
    ),
    ActiveDuration.short()
  ),
])

const schedules = [
  {
    id: 'vod',
    ad: adScheduleForVod,
  },
  {
    id: 'live',
    ad: adScheduleForLive,
  },
]
