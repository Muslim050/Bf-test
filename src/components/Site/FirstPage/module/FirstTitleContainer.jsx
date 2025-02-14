import { useEffect, useRef } from 'react'
import m from '../FirstPage.module.scss'
import { gsap } from 'gsap'
import { Youtube } from 'lucide-react';

const FirstTitleContainer = ({
  paragraphRef,
  headerRef,
  button1Ref,
  button2Ref,
}) => {
  const cardRef = useRef(null)
  const sparkleRef = useRef(null)
  useEffect(() => {
    const card = cardRef.current
    const sparkles = sparkleRef.current

    // Анимация при наведении
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e

      gsap.to(sparkles, {
        x: clientX - card.getBoundingClientRect().left,
        y: clientY - card.getBoundingClientRect().top,
        duration: 0.3,
        ease: 'power3.out',
        opacity: 1,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(sparkles, {
        opacity: 0,
        duration: 0.3,
        ease: 'power3.out',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  return (
    <div className="w-full justify-center text-center">
      <div className="w-full justify-center items-center flex-col flex md:my-5 my-1">
        <h2
          ref={headerRef}
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
          className={`animated-element text-[35px] md:text-[40px] lg:text-[60px] pt-3  text-center `}
        >
          Платформа Видеорекламы в YouTube
        </h2>

        <p
          ref={paragraphRef}
          className={`flex-wrap justify-center text-slate-500 text-[12px] md:text-[15px] lg:text-[18px] py-3 text-center flex items-center`}
        >
          Разместите ваш рекламный ролик в  <span className='text-white ml-1'>You<span className='bg-red-600 p-0.5 rounded-[10px] font-semibold'>Tube</span> </span>, буквально в три клика
        </p>
      </div>
      <div className="relative sm:inline-block flex justify-center  gap-5 items-center ">
        <div ref={sparkleRef} className={m.sparklesBTN} />
        <div ref={cardRef}>
          <a
            href="#Монетизировать"
            ref={button1Ref}
            style={{
              background:
                'linear-gradient(177.96deg, rgba(2, 3, 8, 0) -16.56%, rgba(255, 255, 255, 0.1) 108%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow:
                'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(6px)',
            }}
            className={`${m.hover_with_before} mr-5 sm:w-[230px] w-auto h-[50px] sm:px-[30px] px-[10px] py-[15px]  rounded-[500px]  justify-center items-center gap-2.5 inline-flex `}
          >
            <div
              // ref={cardRef}
              className="text-white text-xs sm:text-base  font-normal leading-relaxed"
            >
              Заказать рекламу
            </div>
          </a>
          <a
            href="#Монетизировать"
            ref={button2Ref}
            style={{
              background:
                'linear-gradient(177.96deg, rgba(2, 3, 8, 0) -16.56%, rgba(255, 255, 255, 0.1) 108%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow:
                'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(6px)',
            }}
            className={`${m.hover_with_before}  sm:w-[230px] w-auto h-[50px] sm:px-[30px] px-[10px] py-[15px]  rounded-[500px]  justify-center items-center gap-2.5 inline-flex`}
          >
            <div className="text-white text-xs sm:text-base  font-normal leading-relaxed">
              Монетизировать
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
export default FirstTitleContainer
