'use client'
import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default function VideoPlayer({ src }: { src: string }){
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playerRef = useRef<any>(null)

  useEffect(()=>{
    if (!videoRef.current) return
    playerRef.current = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: true,
    })
    playerRef.current.src({ src, type: 'video/mp4' })
    return ()=> {
      if (playerRef.current) playerRef.current.dispose()
    }
  }, [src])

  return (
    <div>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  )
}
