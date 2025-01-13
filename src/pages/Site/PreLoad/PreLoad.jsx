import React, { useEffect, useRef, useState } from 'react'
import { EllipseSvg, EllipseSvg2 } from '@/assets/Site/site-svg.jsx'
import Logo from '@/assets/Logo.png'

const PreLoad = ({ onComplete }) => {
  const containerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [fadeOut, setFadeOut] = useState(false) // состояние для запуска плавного исчезновения

  useEffect(() => {
    // Блокируем скролл при показе прелоадера
    document.body.style.overflow = 'hidden'

    // Таймер для завершения анимации и запуска fade-out эффекта
    const animationTimer = setTimeout(() => {
      setFadeOut(true) // Запускаем плавное исчезновение
    }, 2000) // Время для завершения всех анимаций

    // Таймер для завершения fade-out эффекта и запуска основного onComplete
    const completeTimer = setTimeout(() => {
      setIsLoaded(true)
      onComplete()
      // Восстанавливаем скролл после завершения
      document.body.style.overflow = 'auto'
    }, 2500) // Добавляем небольшую задержку для fade-out

    return () => {
      // Чистим таймеры и восстанавливаем скролл при размонтировании
      clearTimeout(animationTimer)
      clearTimeout(completeTimer)
      document.body.style.overflow = 'auto'
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden transition-opacity duration-500 h-screen ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: "radial-gradient(49.2% 63.45% at 50% 45.62%, rgba(21, 61, 204, 0.08) 14.36%, rgba(5, 5, 11, 0) 100%), radial-gradient(47.78% 64.92% at 50% 44.06%, rgba(216, 236, 248, 0.04) 0%, rgba(152, 192, 239, 0.01) 50%, rgba(5, 5, 11, 0) 100%",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
      }}
    >
      {/*<GradientBGSvg className="absolute top-0 w-full -z-5 overflow-hidden "/>*/}
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full">
        <div className="relative animate-rotate">
          <EllipseSvg className="absolute top-1/2 transform -translate-y-1/2 w-full -z-5"/>
        </div>
        <div className="relative animate-fadeInRotate">
          <EllipseSvg2 className="absolute top-1/2 transform -translate-y-1/2 w-full -z-5"/>
        </div>
        <div className="relative left-0 -top-12 w-full flex flex-col justify-center animate-fadeIn">
          <div className="flex justify-center">
            <img loading="lazy" src={Logo} alt="" className="w-[54px] h-[60px]"/>
          </div>
          <div
            style={{
              background: 'linear-gradient(360deg, #FFFFFF 16.15%, rgba(255, 255, 255, 0.3) 140.1%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              letterSpacing: '-0.03em',
              textShadow: '0px 4px 20px rgba(255, 255, 255, 0.25)',
            }}
            className="text-[32px] font-bold pt-3 text-center"
          >
            Brandformance
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreLoad
