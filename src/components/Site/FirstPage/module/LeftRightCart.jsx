import YouTubeCart from '@/assets/Site/FirstPage/dopYoutube.png'
import video1 from '@/assets/Site/FirstPage/Video/11.mp4'
import video2 from '@/assets/Site/FirstPage/Video/122.mp4'
import prerollImage from '@/assets/Site/FirstPage/preroll.png'
import mixrollImage from '@/assets/Site/FirstPage/mixroll.png'
import LazyVideo from './LazyVideo'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import m from '../FirstPage.module.scss'

const LeftRightCart = ({ phoneLeftCart, phoneRightCart }) => {
  const sparkleRef = useRef(null)
  const sparkleRef2 = useRef(null)

  useEffect(() => {
    const card = phoneLeftCart.current
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

    // eslint-disable-next-line react/prop-types
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  useEffect(() => {
    const card = phoneRightCart.current
    const sparkles = sparkleRef2.current

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
    <div
      className={`flex justify-between custom-845:justify-center items-center flex-wrap px-4 gap-4`}
    >
      <div
        ref={phoneLeftCart}
        className={`${m.wrapperCard}
              custom-1100:bottom-0 bottom-52
              w-[400px] h-[500px]  z-10 p-7 flex flex-col justify-between`}
        style={{
          background:
            'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
          border: '0.5px solid rgba(255, 255, 255, 0.1)',
          boxShadow:
            'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
          borderRadius: '20px',
        }}
      >
        <div ref={sparkleRef} className={m.sparkles} />

        <div
          style={{
            borderRadius: '20px',
          }}
          className="h-[280px] relative"
        >
          <div className="rounded-[12px]">
            <div className=" flex justify-end flex-col w-full">
              <img className="" src={YouTubeCart} loading="lazy" alt="" />
              <div className="absolute top-11">
                <LazyVideo src={video1} />
              </div>

              <div className="absolute top-11 w-full">
                <img
                  src={prerollImage}
                  loading="lazy"
                  alt=""
                  className="w-full "
                />
              </div>
            </div>

            <div className="text-white bg-black h-[86px] rounded-b-[20px] p-5 absolute -bottom-12 w-full">
              <div>Встречайте обновленый BYD Champion</div>
              <div className="text-[10px] text-[#ffffff85] mt-2">
                Подробнее С 13:22. www.byd.uz
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl	text-white">Pre-Roll</h1>
          <p className="text-[#6D768F] text-sm	">
            Рекламное видео длительностью до 20 секунд размещается перед началом
            видеоконтента.
          </p>
        </div>
      </div>

      <div
        ref={phoneRightCart}
        className={`${m.wrapperCard} w-[400px] h-[500px] right-0 z-10 p-7 flex flex-col justify-between bottom-52 custom-1100:bottom-0`}
        style={{
          background:
            'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
          border: '0.5px solid rgba(255, 255, 255, 0.1)',
          boxShadow:
            'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
          borderRadius: '20px',
        }}
      >
        <div ref={sparkleRef2} className={m.sparkles} />

        <div
          style={{
            borderRadius: '20px',
          }}
          className="h-[280px] relative"
        >
          <div className="rounded-[12px]">
            <div className=" flex justify-end flex-col w-full">
              <img className="" loading="lazy" src={YouTubeCart} alt="" />
              <div className="absolute top-11">
                <LazyVideo src={video2} />
              </div>

              <div className="absolute top-11 w-full">
                <img
                  src={mixrollImage}
                  alt=""
                  loading="lazy"
                  className="w-full "
                />
              </div>
            </div>
            <div className="text-white bg-black h-[86px] rounded-b-[20px] p-5 absolute -bottom-12 w-full">
              <div>BYD Song Pro - для тех, кто ценит прогресс.</div>
              <div className="text-[10px] text-[#ffffff85] mt-2">
                Подробнее 13:22. www.byd.uz
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl	text-white">Mid-Roll</h1>
          <p className="text-[#6D768F] text-sm	">
            Рекламное видео длительностью до 20 секунд размещается примерно
            через 7-10 минут после начала видеоконтента.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LeftRightCart
