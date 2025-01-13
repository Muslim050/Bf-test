import { SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import m from './BuisnessModel.module.scss'
import PageTitle from '../module/PageTitle'
import RightForm from './RightForm'
import LeftForm from './LeftForm'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function SeventhPage() {
  const phoneRightCart = useRef(null)
  const phoneLeftCart = useRef(null)
  const contentRef = useRef(null)
  const [tabValue, setTabValue] = React.useState('adv')
  const handleTabChange = (value) => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        // { opacity: 0, y: 10 },
        { opacity: 0, scale: 0.9, y: -50 },

        {
          opacity: 1,
          scale: 1,

          y: 0,
          duration: 2,
          ease: 'power4.out',
        },
      )
    }
    setTabValue(value)
  }

  React.useEffect(() => {
    if (phoneLeftCart.current && phoneRightCart.current) {
      gsap.fromTo(
        phoneLeftCart.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phoneLeftCart.current,
            start: 'top center+=500',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        phoneRightCart.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phoneRightCart.current,
            start: 'top center+=500',
            scrub: true,
          },
        },
      )
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
    // <section className="relative h-full" id="Монетизировать">
    <section className="overflow-hidden" id="Монетизировать">
      <div className=" ">
        {/* max-w-[900px] w-full m-auto */}
        <div className="relative  flex-col justify-between  py-20	   overflow-hidden" style={{
          background: "radial-gradient(49.2% 63.45% at 50% 45.62%, rgba(21, 61, 204, 0.08) 14.36%, rgba(5, 5, 11, 0) 100%), radial-gradient(47.78% 64.92% at 50% 44.06%, rgba(216, 236, 248, 0.04) 0%, rgba(152, 192, 239, 0.01) 50%, rgba(5, 5, 11, 0) 100%",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        }}>
          {/*<GradientBGSvg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />*/}
          <StarsSSSvg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />
          <SetkaSvg className="absolute top-0 left-0 w-[100%] h-full -z-[5px]" />
          <div className="max-w-[1240px] w-full mx-auto px-4 py-28">
            <div ref={phoneLeftCart}>
              <PageTitle
                topTitle={'Свяжитесь с нами'}
                title={'Развивайте свой бизнес с нами'}
              />
            </div>
            <div className="flex justify-center" ref={phoneRightCart}>
              <Tabs
                value={tabValue}
                className="w-[400px]"
                onValueChange={handleTabChange}
              >
                <TabsList
                  ref={cardRef}
                  className="grid w-full grid-cols-2 p-0  h-[50px] rounded-full"
                  style={{
                    background: 'rgba(2, 3, 8, 0.5)',
                    boxShadow:
                      'inset 0px 0.3px 0px rgba(255, 255, 255, 0.1), inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <div ref={sparkleRef} className={m.sparkles} />

                  <TabsTrigger value="adv" className={m.tabs_trigger}>
                    Для рекламодателей
                  </TabsTrigger>
                  <TabsTrigger value="channel" className={m.tabs_trigger}>
                    Для каналов
                  </TabsTrigger>
                </TabsList>
                <div ref={contentRef}>
                  <TabsContent value="adv">
                    {tabValue === 'adv' && <LeftForm />}
                  </TabsContent>

                  <TabsContent value="channel">
                    {tabValue === 'channel' && <RightForm />}
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeventhPage
