import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import m from './FifthPage.module.scss'
import PageTitle from '../module/PageTitle'
import svg1 from '../../../assets/Site/FifthPage/1.webp'
import svg2 from '../../../assets/Site/FifthPage/3.webp'
import svg3 from '../../../assets/Site/FifthPage/4.webp'

function FifthPage2() {
  return (
    <section className="overflow-hidden">
      <div
        className=" relative"
        style={{
          background:
            'radial-gradient(49.2% 63.45% at 50% 45.62%, rgba(21, 61, 204, 0.08) 14.36%, rgba(5, 5, 11, 0) 100%), radial-gradient(47.78% 64.92% at 50% 44.06%, rgba(216, 236, 248, 0.04) 0%, rgba(152, 192, 239, 0.01) 50%, rgba(5, 5, 11, 0) 100%',
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        }}
      >
        {/* max-w-[900px] w-full m-auto */}
        {/*<GradientBGSvg className="absolute top-0 left-0 w-full h-full -z-[5px]" />*/}
        <StarsSSSvg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />
        <SetkaSvg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />
        <div className="relative  flex-col justify-between  py-20	   overflow-hidden">
          <div className="text-center max-w-[1240px] w-full m-auto">
            <PageTitle
              topTitle={'Статистика'}
              title={'300 миллионов показов каждый месяц'}
            />
          </div>
          <div
            className={` h-full flex-wrap flex  gap-5 justify-center max-w-[1240px] w-full m-auto px-5`}
          >
            <div className="flex flex-col  justify-between gap-5">
              <CardFifthPage
                gifSrc={svg1}
                title="15 миллионов"
                customClass={'h-[400px]'}
                text="Охват уникальных зрителей"
                customGifClass={'text-center'}
              />

              <CardFifthPage
                title="... максимально гарантированный уровень brand safety"
                customClass={'h-[200px]'}
              />
            </div>

            <div className="flex flex-col gap-5 justify-between">
              <CardFifthPage
                gifSrc={svg2}
                title="300 миллионов"
                text="Показов рекламы ежемесячно"
                customGifClass={'text-center'}
              />

              <CardFifthPage
                gifSrc={svg3}
                title="18-44"
                text="Ядро возраста зрителей"
                customGifClass={'text-center'}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CardFifthPage = ({
  title,
  text,
  gifSrc,
  customClass,
  customGifClass,
}) => {
  const cardRef = useRef(null)
  const sparkleRef = useRef(null)
  useEffect(() => {
    const card = cardRef.current
    const sparkles = sparkleRef.current

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e

      const cardRect = card.getBoundingClientRect()
      const x = clientX - cardRect.left
      const y = clientY - cardRect.top

      // Обновляем положение и видимость свечения
      gsap.to(sparkles, {
        x: x - sparkles.offsetWidth / 2, // Центрируем по оси X
        y: y - sparkles.offsetHeight / 2, // Центрируем по оси Y
        duration: 0.3,
        ease: 'power3.out',
        opacity: 1,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(sparkles, {
        opacity: 0, // Скроем свечение при уходе
        duration: 0.3,
        ease: 'power3.out',
      })
    }

    // Навешиваем обработчики событий
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        background:
          ' linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
        boxShadow:
          'inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
        borderRadius: '20px',
      }}
      className={`${m.cardWrapper} ${customClass}  hover:scale-105 	transition delay-150 duration-300 ease-in-out bg-[#BACFF7] bg-opacity-20 p-6 rounded-[20px] shadow-lg  w-[400px]`}
    >
      <div className="flex flex-col items-center justify-between h-full">
        {gifSrc && (
          <div className={`w-full h-[180px] relative `}>
            <img
              loading="lazy"
              src={gifSrc}
              alt="Example GIF"
              className={`absolute top-0 h-auto w-full `}
            />
          </div>
        )}

        <div className={customGifClass}>
          <h2 className="text-white text-[40px] font-medium mb-2">{title}</h2>
          <p className="text-[#6D768F] text-sm	">{text}</p>
        </div>
      </div>
      <div ref={sparkleRef} className={m.sparkles} />
    </div>
  )
}
export default FifthPage2
