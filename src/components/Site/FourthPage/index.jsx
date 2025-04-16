import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Video from './VideoBG.mp4'
import { StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import m from './FourthPage.module.scss'
import image1 from '@/assets/FourthPage/1.png'
import image2 from '@/assets/FourthPage/2.png'
import image3 from '@/assets/FourthPage/3.png'
import image4 from '@/assets/FourthPage/4.png'
import image5 from '@/assets/FourthPage/5.png'
import image6 from '@/assets/FourthPage/6.png'
import image7 from '@/assets/FourthPage/7.png'
import image8 from '@/assets/FourthPage/8.png'
import image9 from '@/assets/FourthPage/9.png'
import image10 from '@/assets/FourthPage/10.png'
import image11 from '@/assets/FourthPage/11.png'
import image12 from '@/assets/FourthPage/12.png'
import image13 from '@/assets/FourthPage/13.png'
import image14 from '@/assets/FourthPage/14.png'
import image15 from '@/assets/FourthPage/15.png'
import image01 from '@/assets/FourthPage/imm/1.png'
import image22 from '@/assets/FourthPage/imm/2.png'
import image33 from '@/assets/FourthPage/imm/3.png'
import image44 from '@/assets/FourthPage/imm/4.png'
import image55 from '@/assets/FourthPage/imm/5.png'
import image66 from '@/assets/FourthPage/imm/6.png'
import image77 from '@/assets/FourthPage/imm/7.png'
import image88 from '@/assets/FourthPage/imm/8.png'
import image99 from '@/assets/FourthPage/imm/9.png'
import image100 from '@/assets/FourthPage/imm/10.png'
import image111 from '@/assets/FourthPage/imm/11.png'
import image122 from '@/assets/FourthPage/imm/12.png'

const imagesData = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
  { id: 3, image: image3 },
  { id: 4, image: image4 },
  { id: 5, image: image5 },
  { id: 6, image: image6 },
  { id: 7, image: image7 },
  { id: 8, image: image8 },
  { id: 9, image: image9 },
  { id: 10, image: image10 },
  { id: 11, image: image11 },
  { id: 12, image: image12 },
  { id: 13, image: image13 },
  { id: 14, image: image14 },
  { id: 15, image: image15 },
]
const imagesData2 = [
  { id: 1, image: image01 },
  { id: 2, image: image22 },
  { id: 3, image: image33 },
  { id: 4, image: image44 },
  { id: 5, image: image55 },
  { id: 6, image: image66 },
  { id: 7, image: image77 },
  { id: 8, image: image88 },
  { id: 9, image: image99 },
  { id: 10, image: image100 },
  { id: 11, image: image111 },
  { id: 12, image: image122 },
]

gsap.registerPlugin(ScrollTrigger)

const FourthPage = () => {
  // Ref для заголовка первого блока
  const textRefFirst = useRef(null)
  // Ref для заголовка второго блока
  const textRefSecond = useRef(null)

  useEffect(() => {
    // Инициализируем начальное состояние двух заголовков:
    // Первый блок — видим, второй — скрыт.
    if (textRefFirst.current) {
      textRefFirst.current.textContent = 'Каналы, выбравшие нас'
      gsap.set(textRefFirst.current, {
        opacity: 1,
        y: 0,
        position: 'relative',
        zIndex: 999,
      })
    }
    if (textRefSecond.current) {
      textRefSecond.current.textContent = 'Бренды, выбравшие нас'
      gsap.set(textRefSecond.current, {
        opacity: 0,
        y: 50,
        position: 'relative',
        zIndex: 999,
      })
    }

    // Batch-анимация карточек для всех элементов с классом "card"
    ScrollTrigger.batch('.card', {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
        })
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          opacity: 0,
          y: 200,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.in',
        })
      },
      start: 'top 80%',
      end: 'bottom 20%',
    })

    // Мастер-таймлайн для анимаций с прокруткой (pinning секции и расширенный скролл)
    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.sectionFourthBlue',
        start: 'top top',
        end: '+=400%',
        scrub: true,
        pin: true,
      },
    })

    // Анимация фоновых элементов (например, масштабирование и появление)
    masterTL
      .fromTo(
        '.dog-1',
        { opacity: 0, scale: 6 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power1.out' },
      )
      .to('.dog-2', { opacity: 1, duration: 2, ease: 'power1.out' }, 0)

    // Устанавливаем метку для скрытия первого блока (задержка 2 сек)
    masterTL.addLabel('blockSwitch', 2)
    // Скрываем карточки первого блока
    masterTL.to(
      '.firstBlock',
      { opacity: 0, y: -80, duration: 1, ease: 'power2.out' },
      'blockSwitch',
    )
    // Скрываем заголовок первого блока
    masterTL.to(
      textRefFirst.current,
      { opacity: 0, y: 50, duration: 1, ease: 'power2.in' },
      'blockSwitch',
    )

    // Добавляем метку для появления второго блока через 1 секунду после "blockSwitch"
    masterTL.addLabel('showSecond', 'blockSwitch+=1')
    // Показываем заголовок второго блока
    masterTL.fromTo(
      textRefSecond.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      'showSecond',
    )
    // Показываем карточки второго блока
    masterTL.fromTo(
      '.secondBlock',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      'showSecond',
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="sectionFourth sectionFourthBlue">
      {/* Видео на заднем фоне */}
      <video
        src={Video}
        autoPlay
        muted
        loop
        playsInline
        loading="lazy"
        style={{ paddingBottom: '10px' }}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="dog-1 absolute w-full h-full">
        <div
          style={{
            background:
              'radial-gradient(49.2% 63.45% at 50% 45.62%, rgba(21,61,204,0.08) 14.36%, rgba(5,5,11,0) 100%), radial-gradient(47.78% 64.92% at 50% 44.06%, rgba(216,236,248,0.04) 0%, rgba(152,192,239,0.01) 50%, rgba(5,5,11,0) 100%)',
            filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
          }}
          className="absolute top-0 left-0 w-full h-auto z-10"
        />
        <StarsSSSvg className="absolute top-0 left-0 w-[100%] h-auto z-10 mb-2" />
        <video
          src={Video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        ></video>
        <div className="mix-blend-multiply m-auto font-black uppercase absolute top-0 left-0 w-full h-full text-white bg-[#05060a] text-[35px] flex justify-center flex-col items-center">
          Brandformance
        </div>
      </div>

      {/* Контейнер для заголовков – можно расположить их один над другим */}
      <div className="relative h-full mt-20 flex flex-col items-center">
        {/* Заголовок для первого блока */}
        <h2
          ref={textRefFirst}
          style={{
            background:
              'linear-gradient(360deg, #FFFFFF 16.15%, rgba(255,255,255,0.3) 140.1%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            letterSpacing: '-0.03em',
            textShadow: '0px 4px 20px rgba(255,255,255,0.25)',
          }}
          className="animated-element text-[35px] md:text-[40px] lg:text-[60px] text-center"
        >
          Каналы, выбравшие нас
        </h2>
        {/* Заголовок для второго блока (изначально скрыт) */}
        <h2
          ref={textRefSecond}
          style={{
            top: '-50px',

            background:
              'linear-gradient(360deg, #FFFFFF 16.15%, rgba(255,255,255,0.3) 140.1%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            letterSpacing: '-0.03em',
            textShadow: '0px 4px 20px rgba(255,255,255,0.25)',
          }}
          className="animated-element text-[35px] md:text-[40px] lg:text-[60px] text-center"
        >
          Бренды, выбравшие нас
        </h2>
      </div>

      {/* Первый блок карточек */}
      <div className="firstBlock imgFourth max-w-[1240px] w-full m-auto">
        <div className={m.wrapperCard}>
          {imagesData.map((item, index) => (
            <div
              key={item.id}
              className={`card card-${index} ${m.cardWrapper} flex items-center justify-center`}
              style={{
                background:
                  'linear-gradient(0deg, rgba(186,207,247,0.04), rgba(186,207,247,0.04)), rgba(2,3,8,0.8)',
                border: '0.5px solid rgba(255,255,255,0.1)',
                boxShadow:
                  '0px 16px 32px rgba(0,0,0,0.3), inset 0px 1px 1px rgba(216,236,248,0.3), inset 0px 24px 48px rgba(168,216,245,0.06)',
                borderRadius: '20px',
                opacity: 0,
                transform: 'translateY(1000px)',
              }}
            >
              <img
                loading="lazy"
                src={item.image}
                alt={`Image ${item.id}`}
                className="w-auto h-auto max-w-[150px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Второй блок карточек (изначально скрыт) */}
      <div
        className="secondBlock imgFourth max-w-[1240px] w-full m-auto"
        style={{ opacity: 0 }}
      >
        <div className={m.wrapperCard}>
          {imagesData2.map((item, index) => (
            <div
              key={`second-${item.id}`}
              className={`card card-second-${index} ${m.cardWrapper} flex items-center justify-center`}
              style={{
                background:
                  'linear-gradient(0deg, rgba(186,207,247,0.04), rgba(186,207,247,0.04)), rgba(2,3,8,0.8)',
                border: '0.5px solid rgba(255,255,255,0.1)',
                boxShadow:
                  '0px 16px 32px rgba(0,0,0,0.3), inset 0px 1px 1px rgba(216,236,248,0.3), inset 0px 24px 48px rgba(168,216,245,0.06)',
                borderRadius: '20px',
                opacity: 0,
                transform: 'translateY(1000px)',
              }}
            >
              <img
                loading="lazy"
                src={item.image}
                alt={`Image ${item.id}`}
                className="w-auto h-auto max-w-[150px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FourthPage
