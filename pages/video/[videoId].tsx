import React from 'react'
import VideoPage from '../../src/view/video-page/VideoPage'
import { useRouter } from 'next/router'

const VideoPageRoute: React.VFC = () => {
  const router = useRouter()
  const { videoId } = router.query

  return videoId ? <VideoPage videoId={videoId as string} /> : <></>
}

export default VideoPageRoute
