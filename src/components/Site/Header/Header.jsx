import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { AlignJustify } from 'lucide-react'
import './header.scss'
import Logo from '@/assets/Logo.png'
import {
  FacebookSvg,
  InstagramSvg,
  YoutubeSvg,
} from '@/assets/Site/site-svg.jsx'
const Header = () => {
  const logoRef = useRef(null)
  const borderRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const leftMenuRef = useRef([])
  const rightMenuRef = useRef([])
  const mobileMenuRef = useRef(null)

  leftMenuRef.current = []
  rightMenuRef.current = []

  useEffect(() => {
    // Только для десктопов
    let ctx = gsap.context(() => {
      const tl = gsap.timeline()
      // Анимации только на экранах шире 768px
      tl.from(logoRef.current, {
        opacity: 0,
        stagger: 0.2,
        scale: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.2,
      })
        .to(
          borderRef.current,
          {
            width: '80px',
            height: '80px',
            duration: 1.5,
            ease: 'power4.inOut',
          },
          '-=1.5',
        )
        .to(borderRef.current, {
          width: '100%',

          duration: 1.5,
          ease: 'power4.inOut',
        })
        .from(
          leftMenuRef.current,
          {
            opacity: 0,
            x: -20,
            stagger: 0.2,
            duration: 1,
            ease: 'power4.out',
          },
          '-=0.5',
        )
        .from(
          rightMenuRef.current,
          {
            opacity: 0,
            x: 30,
            stagger: 0.1,
            duration: 1,
            ease: 'power4.out',
          },
          '-=0.5',
        )
    })
    return () => ctx.revert() // Очистка контекста при размонтировании
  }, [])
  const addToLeftMenuRefs = (el) => {
    if (el && !leftMenuRef.current.includes(el)) {
      leftMenuRef.current.push(el)
    }
  }

  const addToRightMenuRefs = (el) => {
    if (el && !rightMenuRef.current.includes(el)) {
      rightMenuRef.current.push(el)
    }
  }
  const toggleMenu = () => {
    if (isMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => setIsMenuOpen(false),
      })
    } else {
      setIsMenuOpen(true)
      setTimeout(() => {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power4.inOut' },
        )
      }, 0)
    }
  }
  const sparkleRef = useRef(null)

  useEffect(() => {
    const card = borderRef.current
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
    <section className="flex items-center justify-center">
      <div className="sparklesWrapper w-full max-w-[1240px] px-4 h-[60px] m-auto fixed z-50 top-[15px] flex flex-col items-center rounded-[40px]">
        <div
          ref={borderRef}
          style={{
            background: 'rgba(2, 3, 8, 0.25)',
            boxShadow:
              'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
            backdropFilter: ' blur(6px)',
            borderRadius: '500px',
          }}
          className="animated-element px-7 w-0 h-0 flex items-center justify-between rounded-[40px] overflow-hidden bg-[#02030840] bg-opacity-30 backdrop-blur-md"
        >
          <div ref={sparkleRef} className="sparkles" />

          <div className="headerTextLeft  items-center gap-2 w-1/2">
            <div
              ref={addToLeftMenuRefs}
              className="text-base font-bold	 text-white"
              onClick={() => {
                window.location.reload()
              }}
            >
              Brandformance
            </div>
            <a
              href="#ThirdPage"
              ref={addToLeftMenuRefs}
              className="header_button"
            >
              Технология
            </a>

            <a
              href="#second-page"
              ref={addToLeftMenuRefs}
              className="header_button"
            >
              Форматы рекламы
            </a>
          </div>
          <div
            ref={logoRef}
            className=" animated-element flex items-center justify-center w-10 h-10"
            onClick={() => {
              window.location.reload()
            }}
          >
            <img loading="lazy" src={Logo} alt="Logo" className="w-7 h-8" />
          </div>

          <div className="headerTextRight justify-end gap-2 w-1/2">
            <a
              href="#FifthPage"
              ref={addToRightMenuRefs}
              className="header_button"
            >
              Размещения
            </a>
            {/* <div ref={addToRightMenuRefs} className="header_button">
              Новости
            </div> */}
            <a
              href="#FourthPageP"
              ref={addToRightMenuRefs}
              className="header_button"
            >
              Партнеры
            </a>

            <a
              href="#contact"
              ref={addToRightMenuRefs}
              className="header_button"
            >
              Контакты
            </a>
            <a
              ref={addToRightMenuRefs}
              className="header_button"
              style={{
                border: '0.5px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '500px',

                background:
                  'linear-gradient(180deg,rgba(2, 3, 8, 0) 0%,rgba(255, 255, 255, 0.1) 100%)',
              }}
              target="_blank"
              href="/login"
            >
              Войти
            </a>
          </div>
          <div className="burgerMenu items-center">
            <button
              onClick={toggleMenu}
              className="focus:outline-none transition duration-500 ease-in-out"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <AlignJustify className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="burgerMenuList fixed inset-0 px-10 mt-[90px] bg-[#02030840] bg-opacity-90 backdrop-blur-md p-4 rounded-lg shadow-lg z-50"
          >
            <div className="flex flex-col gap-3 justify-between h-full">
              <div className="flex flex-col gap-6 justify-center items-center">
                <a
                  href="#ThirdPage"
                  className="text-white  text-4xl"
                  onClick={toggleMenu}
                >
                  Технология
                </a>

                <a
                  href="#second-page"
                  className="text-white text-4xl"
                  onClick={toggleMenu}
                >
                  Форматы рекламы
                </a>
                <a
                  href="#FifthPage"
                  className="text-white  text-4xl"
                  onClick={toggleMenu}
                >
                  Размещения
                </a>

                <a
                  href="#FourthPageP"
                  className="text-white  text-4xl"
                  onClick={toggleMenu}
                >
                  Партнеры
                </a>

                <a
                  href="#contact"
                  className="text-white  text-4xl"
                  onClick={toggleMenu}
                >
                  Контакты
                </a>

                <a
                  className="text-white  text-4xl px-9 py-6"
                  style={{
                    border: '0.5px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '500px',

                    background:
                      'linear-gradient(180deg,rgba(2, 3, 8, 0) 0%,rgba(255, 255, 255, 0.1) 100%)',
                  }}
                  target="_blank"
                  href="/login"
                >
                  Войти
                </a>
              </div>

              <div className="text-white  flex items-center justify-center max-w-[1240px] w-full m-auto">
                <div className="flex items-center gap-2">
                  <FacebookSvg className="w-14 h-14" />{' '}
                  <InstagramSvg className="w-14 h-14" />{' '}
                  <YoutubeSvg className="w-14 h-14" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Header
