import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'tailwindcss/tailwind.css'
import { SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import Blestki from './Blestki.svg'
import { Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger)
import m from './Faq.module.scss'
import image1 from '../../../assets/Site/SixthPage/1.png'
import image2 from '../../../assets/Site/SixthPage/2.png'
import image3 from '../../../assets/Site/SixthPage/3.png'
import image4 from '../../../assets/Site/SixthPage/4.png'
import image5 from '../../../assets/Site/SixthPage/5.png'

const items = [
  {
    title: 'Какие услуги предоставляет Brandformance?',
    image: image1,
  },
  {
    title: 'Brandformance поможет моему бизнесу достичь новых высот?.',
    image: image2,
  },
  {
    title: 'В каких отраслях вы специализируетесь?',
    image: image3,
  },
  {
    title: 'Как можно начать сотрудничество с Brandformance?',
    image: image4,
  },
  {
    title: (
      <div>
        На каких <Youtube className="ml-1 text-red-600" /> <span className="text-white">YouTube</span>, каналах будет размещена реклама моего бренда?
      </div>
    ),
    image: image5,
  },
]

const FaqPage = () => {
  const containerRef = useRef(null)
  useEffect(() => {
    const container = containerRef.current
    const elements = container.querySelectorAll('.containerCart')

    gsap.set(elements, { opacity: 0, y: 50 })

    elements.forEach((element) => {
      const progressBar = element.querySelector('.progress-bar')

      gsap.set(progressBar, { height: 0 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        })
        .to(element, {
          opacity: 1,
          y: 0,
          duration: 1,
        })
        .to(progressBar, {
          height: '100%',
          duration: 1,
        })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
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
    // <section ref={containerRef} className="overflow-hidden" id="Монетизировать">
    //   <div className=" ">
    //     {/* max-w-[900px] w-full m-auto */}
    //     <div className="relative  flex-col justify-between  py-20	   overflow-hidden">
    //       <GradientBGSvg.svg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />
    //       <StarsSSSvg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />
    //       <SetkaSvg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />

    <section ref={containerRef} className="relative h-full w-full" id="">
      <div className=""
           style={{
        background: "radial-gradient(49.2% 63.45% at 50% 45.62%, rgba(21, 61, 204, 0.08) 14.36%, rgba(5, 5, 11, 0) 100%), radial-gradient(47.78% 64.92% at 50% 44.06%, rgba(216, 236, 248, 0.04) 0%, rgba(152, 192, 239, 0.01) 50%, rgba(5, 5, 11, 0) 100%",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
      }}>
        {/*<GradientBGSvg className="absolute top-0 w-[100%] h-full -z-[5px]" />*/}
        <StarsSSSvg className="absolute top-0 w-[100%] h-full -z-[5px]" />
        <SetkaSvg className="absolute top-0 w-[100%] h-full -z-[5px]" />

        <div className="max-w-[1240px] w-full mx-auto px-4 flex  justify-center xl:justify-between flex-wrap xl:flex-nowrap  py-28 ">
          <div className="text-center xl:text-start w-full xl:w-1/2 ">
            <p className="text-white text-base font-normal">FAQ</p>

            <h2
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
              className={`text-[35px] md:text-[40px] lg:text-[60px] pt-3 pb-10  custom-845:pb-20 `}
            >
              Часто задаваемые вопросы?{' '}
            </h2>
          </div>
          <div
            ref={cardRef}
            className="relative flex flex-col justify-center  items-center gap-12  w-auto lg:w-[600px]   pt-10 xl:pt-0 "
          >
            <div ref={sparkleRef} className={m.sparkles} />{' '}
            {items.map((item, index) => (
              <div
                key={index}
                className={` item flex flex-col items-center text-white containerCart relative md:w-full w-auto`}
              >
                <div
                  className={`p-2  ${m.wrapperCard} flex gap-5 w-full justify-between  hover:scale-105 transition-all`}
                >
                  <div className="relative bg-[#ffffff26] h-[105px] border border-[#ffffff24]   w-1.5 rounded-md">
                    <div
                      className=" progress-bar absolute top-0 left-0 w-1.5 rounded-md "
                      style={{
                        background:
                          'linear-gradient(0deg, #BACFF7, #BACFF7), rgba(2, 3, 8, 0.8)',
                      }}
                    >
                      {' '}
                    </div>
                  </div>
                  <div>
                    <img
                      loading="lazy"
                      src={Blestki}
                      alt=""
                      className="absolute h-auto w-auto z-20 -top-4 -left-[2.5px]"
                    />
                    <div className="flex flex-col justify-between md:w-[330px] w-full">
                      {typeof item.title === 'string' ? (
                        <h2
                          className="text-xl"
                          dangerouslySetInnerHTML={{__html: item.title}}
                        />
                      ) : (
                        <h2 className="text-xl items-center">
                          На каких
                          <span className='text-white ml-1'>You<span
                            className='bg-red-600 p-0.5 rounded-[10px] font-semibold'>Tube</span> </span>
                          каналах будет размещена реклама моего
                          бренда?
                        </h2>
                      )}
                    </div>
                  </div>
                  <div>
                  <div
                      className={` md:w-[200px] w-full h-[110px]  flex items-center rounded-[10px] justify-center`}
                      style={{
                        background:
                          'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',
                        boxShadow:
                          'inset 0px 1.65868px 1.65868px rgba(216, 236, 248, 0.3), inset 0px 39.8082px 79.6164px rgba(168, 216, 245, 0.06)',
                        borderRadius: '10px',
                      }}
                    >
                      <img
                        loading="lazy"
                        src={item.image}
                        alt={item.title}
                        className="image md:w-[180px] w-full h-[90px] object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  )
}

export default FaqPage
