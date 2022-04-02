import { VideoAdvertisementSchedule } from './VideoAdvertisementSchedule'
import { ScheduledVideoAdvertisement } from './ScheduledVideoAdvertisement'
import { ActivationPeriod } from './ActivationPeriod'
import { PlaybackTime } from './PlaybackTime'
import { VideoAdvertisementImageUrl } from './VideoAdvertisementImageUrl'
import { ActiveDuration } from './ActiveDuration'
import { expect } from '@jest/globals'
import { ActiveVideoAdvertisement } from './ActiveVideoAdvertisement'

describe('Test for arrangeReady function', () => {
  describe('returns nothing if there were no ready advertisement', () => {
    test('with playback time before activation period', () => {
      const actual = sut.arrangeReady(PlaybackTime.fromSeconds(9))
      expect(actual[0]).toBe(sut)
      expect(actual[1]).toBeNull()
    })

    test('with playback time after activation period', () => {
      const actual = sut.arrangeReady(PlaybackTime.fromSeconds(21))
      expect(actual[0]).toBe(sut)
      expect(actual[1]).toBeNull()
    })
  })

  describe('returns active advertisement and new schedule when advertisement is ready', () => {
    test('with playback time on beginning of activation period', () => {
      const expectedActiveAdvertisement = new ActiveVideoAdvertisement(
        PlaybackTime.fromSeconds(10),
        new VideoAdvertisementImageUrl(
          'https://pk-mn.com/image/news/2019/07/29/pokesen-saiyou-kikaku-pokemon-jikobunseki-4.jpg'
        ),
        ActiveDuration.short()
      )

      const actual = sut.arrangeReady(PlaybackTime.fromSeconds(10))

      expect(actual[0]).toEqual(expectedSchedule)
      expect(actual[1]).toEqual(expectedActiveAdvertisement)
    })

    test('with playback time on end of activation period', () => {
      const expectedActiveAdvertisement = new ActiveVideoAdvertisement(
        PlaybackTime.fromSeconds(20),
        new VideoAdvertisementImageUrl(
          'https://pk-mn.com/image/news/2019/07/29/pokesen-saiyou-kikaku-pokemon-jikobunseki-4.jpg'
        ),
        ActiveDuration.short()
      )
      const actual = sut.arrangeReady(PlaybackTime.fromSeconds(20))

      expect(actual[0]).toEqual(expectedSchedule)
      expect(actual[1]).toEqual(expectedActiveAdvertisement)
    })

    const expectedSchedule = new VideoAdvertisementSchedule([
      new ScheduledVideoAdvertisement(
        new ActivationPeriod(
          PlaybackTime.fromSeconds(60),
          PlaybackTime.fromSeconds(80)
        ),
        new VideoAdvertisementImageUrl(
          'https://i.ytimg.com/vi/lLtLvpR1m94/maxresdefault.jpg'
        ),
        ActiveDuration.long()
      ),
    ])
  })

  const sut = new VideoAdvertisementSchedule([
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
        PlaybackTime.fromSeconds(80)
      ),
      new VideoAdvertisementImageUrl(
        'https://i.ytimg.com/vi/lLtLvpR1m94/maxresdefault.jpg'
      ),
      ActiveDuration.long()
    ),
  ])
})
