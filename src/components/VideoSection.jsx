import { useState } from 'react'
import videoImg from "../assets/video-img.jpg"
import { Play, X } from 'lucide-react';

const CAR_RENTAL_VIDEO_URL = 'https://assets.mixkit.co/videos/35540/35540-720.mp4';

const VideoSection = () => {
    const [showVideo, setShowVideo] = useState(false);
  return (
    <section className="px-4 sm:py-20 py-16 flex justify-center items-center bg-white head-reveal">
      <div className="relative w-full max-w-7xl">
        {/* Image Container */}
        <img
          src={videoImg}
          alt="BMW car"
          className="w-full sm:h-[450px] h-[300px] rounded-xl object-cover shadow-lg"
        />

        {/* Play Button */}
        <button
          onClick={() => setShowVideo(true)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
        >
          <span className="relative flex justify-center items-center w-20 h-20 rounded-full bg-white bg-opacity-70 shadow-xl">
            <span className="absolute w-28 h-28 bg-white opacity-50 rounded-full -z-10 animate-ping ease-linear"></span>
            <span className="absolute w-32 h-32 bg-white opacity-20 rounded-full -z-10 animate-ping delay-100 ease-linear"></span>
            <Play className='text-red-500 w-8 h-8' />
          </span>
        </button>

        {/* Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4">
            <div className="relative w-full max-w-3xl">
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                aria-label="Close video"
                className="absolute top-2 right-2 text-white text-2xl hover:text-red-500"
              >
                <X className='cursor-pointer' />
              </button>
              <div className="w-full">
                <video
                  src={CAR_RENTAL_VIDEO_URL}
                  title="Electric car city drive"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full rounded-lg bg-black object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default VideoSection