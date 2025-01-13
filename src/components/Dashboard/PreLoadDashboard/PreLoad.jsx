import {
  EllipseSvg,
} from '@/assets/Site/site-svg.jsx'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Logo from '@/assets/Logo.png'

const PreLoadDashboard = ({ onComplete, loading, text, status }) => {
  const textRef = useRef(null)
  const circleContainerRef = useRef(null)
  const circleRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (loading || status === 'loading') {
      // Вращение контейнера с кругами
      gsap.to(circleContainerRef.current, {
        rotation: "+=360",
        duration: 1.5,
        ease: 'linear',
        repeat: -1,
        transformOrigin: '50% 50%',
      })
    } else {
      // Останавливаем вращение и плавно скрываем контейнер при завершении запроса
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power1.inOut',
        onComplete,
      })
    }
  }, [loading, onComplete])

  useEffect(() => {
    // Анимация появления текста
    gsap.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'circ.inOut' }
    )
  }, [])

  return (
    <div ref={containerRef} className="overflow-hidden ">
      <div className='relative h-[90vh] flex justify-center items-center'>
        <div ref={circleContainerRef} className="relative flex justify-center items-center">
          <div ref={circleRef} className=" max-w-[400px] flex justify-center items-center">
            <EllipseSvg className="w-full h-full"/>
          </div>
        </div>
        <div ref={textRef} className="absolute flex flex-col items-center -mt-8">
          <img
            loading="lazy"
            src={Logo}
            alt=""
            className="w-[54px] h-[60px] mb-4"
          />
          <div
            style={{
              background:
                'linear-gradient(360deg, #FFFFFF 16.15%, rgba(255, 255, 255, 0.3) 140.1%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              letterSpacing: '-0.03em',
              textShadow: '0px 4px 20px rgba(255, 255, 255, 0.25)',
            }}
            className="animated-element text-[23px] font-bold text-center"
          >
            {text ? text : 'Brandformance'}
          </div>
        </div>

      </div>
    </div>
  )
}

export default PreLoadDashboard
