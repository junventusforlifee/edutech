'use client'
import React from 'react'
import VideoPlayer from '@/components/VideoPlayer'
import PaystackButton from '@/components/PaystackButton'

export default function DashboardHome(){
  const sampleVideo = '/sample-video.mp4' // replace with your asset or streaming URL

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upcoming live classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3>Mathematics - Algebra</h3>
          <p className="text-sm text-gray-500">Tomorrow, 9:00 AM</p>
          <div className="mt-3 flex gap-2">
            <PaystackButton amount={2000} description="Join live class" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Pre-recorded videos</h2>
      <div className="bg-white p-4 rounded shadow">
        <VideoPlayer src={sampleVideo} />
      </div>
    </div>
  )
}
