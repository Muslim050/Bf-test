import { useEffect, useRef } from 'react'

const LazyVideo = ({ src, ...props }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play()
          } else {
            videoRef.current.pause()
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(videoRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      {...props}
      className="rounded-[12px]"
    ></video>
  )
}

export default LazyVideo
