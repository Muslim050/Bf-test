import { useEffect, useRef, useState } from 'react'
import emailjs from 'emailjs-com'
import style from './BuisnessModel.module.scss'
import Logo from '@/assets/Logo.png'
import { gsap } from 'gsap'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    company: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_9je9dmx',
        'template_33qtram',
        e.target,
        'E8-PX3DmF-moVFtdr',
      )
      .then(() => {
        alert('Письмо успешно отправлено!')
        setFormData({ name: '', email: '', phone_number: '', company: '' })
      })
      .catch(() => {
        alert('Что то пошло не так!')
      })
  }
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
    <div>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="relative">
          <div ref={sparkleRef} className={style.sparkles} />

          <div
            ref={cardRef}
            className=" w-[400px] h-[550px] p-10	rounded-[20px] mt-6 "
            style={{
              background:
                'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',

              boxShadow:
                '0px 16px 32px rgba(0, 0, 0, 0.3), inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
              borderRadius: '20px',
            }}
          >
            {' '}
            <div className="text-lg	font-bold flex gap-3 items-center flex-col text-white">
              <img
                loading="lazy"
                src={Logo}
                className="w-[27px] h-[30px]"
                alt=""
              />{' '}
              Brandformance
            </div>
            <div className="flex flex-col justify-center items-center mt-4 gap-3">
              <p className="text-[24px] text-white font-medium">
                Заказать рекламу
              </p>
              <p className="text-[#6D768F] text-[14px]">
                Если вы рекламодатель
              </p>
            </div>
            <div className="pt-6 flex flex-col gap-4">
              <input
                className="w-full !h-[39px] "
                style={{
                  background: 'rgba(109, 118, 143, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '500px',
                  color: '#FFFFFF',
                  padding: '15px 20px',
                }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Имя"
              />

              <input
                className="w-full !h-[39px] "
                style={{
                  background: 'rgba(109, 118, 143, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '500px',
                  color: '#FFFFFF',
                  padding: '15px 20px',
                }}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                style={{
                  background: 'rgba(109, 118, 143, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '500px',
                  color: '#FFFFFF',
                  padding: '15px 20px',
                }}
                type="text"
                name="phone_number"
                placeholder="Номер телефона"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="w-full !h-[39px] "
                autoComplete="off"
              />

              <input
                style={{
                  background: 'rgba(109, 118, 143, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: '500px',
                  color: '#FFFFFF',
                  padding: '15px 20px',
                }}
                type="text"
                name="company"
                placeholder="Компания"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full !h-[39px] "
                autoComplete="off"
              />
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                type="submit"
                className={style.button}
              >
                <span>Отправить</span>
              </button>
              <button type="submit">Send</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
