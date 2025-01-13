import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useGSAP } from '@gsap/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'tailwindcss/tailwind.css'
import {  SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import { sliderData } from './module/sliderData'
import m from './FirstPage.module.scss'
import Phone from '@/assets/Site/FirstPage/Phone.png'
import Phonebg from '@/assets/Site/FirstPage/HandWithPhone.svg'
import Gradient from '@/assets/Site/FirstPage/Gradient.png'

import Socials from './module/Socials'
import CartUnderVideo from './module/CartUnderVideo'
import FirstTitleContainer from './module/FirstTitleContainer'
import LeftRightCart from './module/LeftRightCart'
import LazyVideo from './module/LazyVideo'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const FirstPage = () => {
  const phoneRef = useRef(null)
  const swiperWRef = useRef(null)
  const phoneWRef = useRef(null)
  const swiperRef = useRef()
  const secondPageTextRef = useRef(null)

  const phoneRightCart = useRef(null)
  const phoneLeftCart = useRef(null)

  const [activeSlide, setActiveSlide] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(4.95)
  const [isSecondPage, setIsSecondPage] = useState(false)

  const firstRef = useRef(null)
  const mediaQuery = window.matchMedia('(min-width: 768px)')

  useEffect(() => {
    gsap.from(firstRef.current, {
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: firstRef.current,
        start: 'top bottom',
        end: 'top center',
        scrub: true,
      },
    })
  }, [])

  useEffect(() => {
    gsap.from(secondPageTextRef.current, {
      opacity: 0, // Начальная прозрачность
      y: 50, // Начальная позиция (снизу)
      duration: 1.5, // Длительность анимации
      ease: 'power3.out', // Тип анимации
    })

    gsap.to([phoneRightCart.current, phoneLeftCart.current], {
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: firstRef.current,
        start: 'top bottom',
        end: 'top center',
        scrub: true,
      },
    })
  }, [])

  //Анимация телефона
  useEffect(() => {
    if (mediaQuery.matches) {
      // Отключение сложных анимаций для мобильных
      gsap.to(phoneRef.current, {
        y: window.innerHeight - 10,
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#second-page',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          onEnter: () => {
            setSlidesToShow(4.95)
            setIsSecondPage(true)
          },
          onLeaveBack: () => {
            setSlidesToShow(4.95)
            setIsSecondPage(false)
          },
        },
      })
    } else {
      gsap.killTweensOf(phoneRef.current);
    }
  }, [])

  //Анимация появления телефона и слайдера
  useEffect(() => {
    gsap.from([phoneRef.current], {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'back',

      delay: 1,
    })
    gsap.from([swiperWRef.current], {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: 'back',

      delay: 1.5,
    })
  }, [])
  //Анимация появления телефона и слайдера

  useEffect(() => {
    gsap.fromTo(
      [phoneRightCart.current, phoneLeftCart.current],
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'easeOut',
        scrollTrigger: {
          trigger: phoneRightCart.current,
          start: 'top center+=1000',
          end: 'top center',
          scrub: true,
        },
      },
    )
  }, [])

  useEffect(() => {
    if (isSecondPage) {
      gsap.fromTo(
        '.mySwiper',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
      )
    }
  }, [isSecondPage])

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
    <div
      ref={firstRef}
      className="animated-element relative min-h-screen  flex flex-col justify-between "
    >
      <div className="overflow-hidden relative">
        {' '}
        {/* FirstSection */}
        <FirstSection />
        {/* FirstSection */}
      </div>
      {/* Вторая страница */}
      <section
        id="second-page"
        className={`relative -z-20 h-full min-h-screen py-24 custom-845:pt-0 `}
        style={{
          background: "radial-gradient(49.2% 63.45% at 50% 45.62%, rgba(21, 61, 204, 0.08) 14.36%, rgba(5, 5, 11, 0) 100%), radial-gradient(47.78% 64.92% at 50% 44.06%, rgba(216, 236, 248, 0.04) 0%, rgba(152, 192, 239, 0.01) 50%, rgba(5, 5, 11, 0) 100%",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        }}
      >
        {/*<GradientBGSvg className="absolute top-0 left-0 w-[100%] h-full  -z-[5px]" />*/}
        <StarsSSSvg className="absolute top-0 left-0  h-full w-[100%] -z-[5px]" />
        <SetkaSvg className="absolute top-0 left-0 w-[100%] h-full  -z-[5px]" />
        <div
          className={`flex  max-w-[1240px] w-full m-auto flex-col h-full justify-between`}
        >
          <div className="text-center relative z-40">
            <h2
              ref={secondPageTextRef}
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
              className={`animated-element text-[35px] md:text-[40px] lg:text-[60px] sm:pt-3 pb-10 pt-28 custom-845:pt-28 custom-845:pb-1  `}
            >
              Развивайте свой бизнес с нами{' '}
            </h2>
          </div>

          {/* Левая и Правая карточка */}
          <LeftRightCart
            phoneLeftCart={phoneLeftCart}
            phoneRightCart={phoneRightCart}
          />
          {/* Левая и Правая карточка */}
        </div>
      </section>
      <div
        className={`fixed  text-white p-4 text-2xl rounded-lg shadow-lg w-full custom-845:bottom-[90%] bottom-[86%]`}
      >
        <div className="flex relative justify-center ">
          <div
            ref={swiperWRef} // добавляем ref здесь
            className={`
              animated-element
              fixed  z-50 left-1/2 transform -translate-x-1/2 w-full custom-845:top-[19%] top-[23%] max-w-[1400px] `}
          >
            {' '}
            <div className="w-auto slider-container" ref={cardRef}>
              <div ref={sparkleRef} className={m.sparkles} />

              <div
                className=" w-10 h-44 absolute -left-4 top-[-10%] z-10"
                style={{
                  filter: 'blur(9.6px)',
                  transform: 'rotate(0deg)',
                  background: '#000000',
                }}
              ></div>
              <Swiper
                lazy={true}
                preloadImages={false}
                slidesPerView={8} // по умолчанию для разрешений выше 1150px
                spaceBetween={0}
                centeredSlides={true}
                navigation={true}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                className="mySwiperFirst"
                modules={[Autoplay, Navigation]}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                  },

                  640: {
                    slidesPerView: 3,
                  },

                  850: {
                    slidesPerView: 4,
                  },
                  1150: {
                    slidesPerView: 6,
                  },
                }}
              >
                {sliderData.map((slide, index) => (
                  <SwiperSlide key={slide.id}>
                    <div
                      className={` relative md:w-[205px] w-[180px]  h-[230px]   ${
                        index === activeSlide
                          ? ` h-[250px]`
                          : `${m.cardWrapper}`
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center flex-col slide
                        ${
                          index === activeSlide
                            ? isSecondPage
                              ? 'firstBorder secondBorder shadow-inner bg-[#BACFF70A]'
                              : 'border-0 mx-auto '
                            : 'firstBorder secondBorder shadow-inner bg-[#BACFF70A] '
                        }
                      `}
                      >
                        <LazyVideo src={slide.image} />
                      </div>
                      {isSecondPage ? null : (
                        <div
                          className={`absolute bottom-0 top-[115px] w-full 
                      flex items-center justify-center slide
                      ${index === activeSlide ? 'text-white' : 'hidden'}
                    `}
                        >
                          <div
                            className={`relative ${
                              index === activeSlide
                                ? ' h-full w-full'
                                : 'hidden'
                            }`}
                          >
                            <CartUnderVideo slide={slide} />
                          </div>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div
                className=" w-10 h-44 absolute -right-4 top-[-10%] z-10"
                style={{
                  filter: 'blur(9.6px)',
                  transform: 'rotate(0deg)',
                  background: '#000000',
                }}
              ></div>
            </div>
          </div>

          <div
            ref={phoneRef}
            className={`animated-element relative flex ${
              isSecondPage && 'custom-1100:hidden'
            }`}
            id="second-page"
          >
            <div
              ref={phoneWRef}
              className={`
              animated-element
              isSecondPagePhone relative  flex  bottom-[-120%] justify-between w-full md:left-[-38px] left-[-35px]`}
            >
              <img
                loading="lazy"
                src={Phone}
                alt="Phone"
                draggable="false"
                className="md:w-auto h-auto w-[330px]"
              />
              <img
                loading="lazy"
                src={Phonebg}
                alt="Phone Background"
                className="absolute -z-10 top-[0px] right-[1px] w"
                draggable="false"
              />
              <img
                loading="lazy"
                src={Gradient}
                className="absolute -bottom-10 w-full z-10"
                alt=""
              />
            </div>

            <div
              className={`fixed top-[135%] z-10 md:left-[183px] left-[164px]  transform -translate-x-1/2 w-full max-w-[1240px]`}
            >
              <div
                className={`w-auto slider-container  ${
                  isSecondPage && 'custom-1100:hidden'
                }`}
              >
                {isSecondPage && (
                  <Swiper
                    lazy={true}
                    preloadImages={false}
                    slidesPerView={1}
                    spaceBetween={20}
                    centeredSlides={true}
                    navigation={true}
                    pagination={{
                      clickable: true,
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                    onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                  >
                    {sliderData
                      .filter((_, index) => index === activeSlide)
                      .map((slide, index) => (
                        <SwiperSlide key={slide.id}>
                          <div className="relative md:w-[205px] w-[180px]  h-[300px]">
                            <div className="flex items-center justify-center flex-col slide border-0 mx-auto">
                              <LazyVideo src={slide.image} />
                            </div>
                            <div
                              className={`absolute bottom-0 w-full
                      flex items-center justify-center slide
                     
                    `}
                            >
                              <div
                                className={`relative  h-full w-full top-[-60px]`}
                              >
                                <CartUnderVideo slide={slide} />
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FirstPage

//Первая Секция
export const FirstSection = () => {
  //Анимация Заголовока
  const headerRef = useRef(null)
  const paragraphRef = useRef(null)
  const button1Ref = useRef(null)
  const button2Ref = useRef(null)
  const socials1 = useRef(null)
  const socials2 = useRef(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    timeline
      .from([button1Ref.current, button2Ref.current], {
        opacity: 0,
        y: 50,
        duration: 1,
      })
      .from(
        [headerRef.current, paragraphRef.current],
        { opacity: 0, y: 50, duration: 1 },
        '-=0.5',
      )
  }, [])

  return (
    <div   style={{
      background: "radial-gradient(49.2% 63.45% at 50% 45.62%, rgba(21, 61, 204, 0.08) 14.36%, rgba(5, 5, 11, 0) 100%), radial-gradient(47.78% 64.92% at 50% 44.06%, rgba(216, 236, 248, 0.04) 0%, rgba(152, 192, 239, 0.01) 50%, rgba(5, 5, 11, 0) 100%",
      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
    }}>
      {/*<GradientBGSvg className="absolute top-0 left-0  w-[100%] h-full -z-[5px]" />*/}
      <StarsSSSvg className="absolute top-0 left-0 w-full h-full -z-[5px]" />
      <SetkaSvg className="absolute top-0 left-0 h-auto w-full -z-[5px]" />
      <section id="first-page" className="h-screen min-h-screen   ">
        <div className=" max-w-[1240px] w-full m-auto">
          {/*  */}
          <div className="absolute inset-x-0 z-[10000] px-5 mt-[100px] ">
            {/* Заголовок  */}
            <FirstTitleContainer
              paragraphRef={paragraphRef}
              headerRef={headerRef}
              button2Ref={button2Ref}
              button1Ref={button1Ref}
            />
            {/* Заголовок  */}
          </div>

          {/* Социальные сети */}
          <Socials socials1={socials1} socials2={socials2} />
          {/* Социальные сети */}
        </div>
      </section>
    </div>
  )
}
//Первая Секция
