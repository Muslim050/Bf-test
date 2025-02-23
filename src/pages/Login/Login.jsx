import React, {useEffect, useRef} from 'react'
import {Eye, EyeOff, Loader2} from 'lucide-react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {useForm} from 'react-hook-form'
import {login} from '@/redux/auth/authSlice.js'
import {toast} from 'react-hot-toast'
import {gsap} from 'gsap'
import {Swiper, SwiperSlide} from 'swiper/react'
import m from './Login.module.scss'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import {sliderData} from './sliderData'
// import Cookies from 'js-cookie'
import Cookies from 'js-cookie'
import {Autoplay, Navigation, Pagination} from 'swiper/modules'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = React.useState(false)
  const [showPasswordOld, setShowPasswordOld] = React.useState(false)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onChange',
  })

  const handleTogglePasswordOld = () => {
    setShowPasswordOld(!showPasswordOld)
  }
  const onSubmit = async (data) => {
    try {
      setIsLogin(true)

      const logindata = await dispatch(login({ data }))
      if (logindata.payload.message === 'Success') {
        const role = Cookies.get('role')
        const routesByRole = {
          admin: '/order',
          publisher: '/sents-order',
          channel: '/sents-order',
          advertiser: '/order',
          guest: '/login',
          advertising_agency: '/order',
        }
        toast.success('Вы успешно вошли в систему Brandformance!')

        const redirectRoute = role ? routesByRole[role] : routesByRole.guest
        // Анимация исчезновения элементов перед навигацией
        animateElementsOut().then(() => {
          navigate(redirectRoute)
        })
        // navigate(redirectRoute)
      } else if (logindata.payload.data.error.detail) {
        toast.error(logindata.payload.data.error.detail)
      }

      setIsLogin(false)
    } catch (error) {
      setIsLogin(false)
      toast.error(error?.data?.error?.message)
    }
  }
  const animateElementsOut = () => {
    return new Promise((resolve) => {
      const duration = 1 // Длительность анимации
      gsap.to(sectionRef.current, { duration: 0.5, opacity: 0, y: -300 })
      gsap.to(titleRef.current, {
        duration: 0.5,
        opacity: 0,
        y: 50,
        delay: 0.5,
      })
      gsap.to(firstRef.current, { duration, opacity: 0, y: 50, delay: 0.8 })
      gsap.to(secondRef.current, { duration, opacity: 0, y: 50, delay: 1 })
      gsap.to(buttonRef.current, { duration, opacity: 0, y: 50, delay: 1.5 })
      gsap.to(leftRef.current, { duration: 0.5, opacity: 0, y: 300 })

      // Разрешение промиса после завершения анимации
      setTimeout(resolve, (duration + 1.5) * 1000)
    })
  }

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const firstRef = useRef(null)
  const secondRef = useRef(null)
  const buttonRef = useRef(null)
  const leftRef = useRef(null)
  const mainTitleRef = useRef(null)
  const mainSubtitleRef = useRef(null)

  useEffect(() => {
    gsap.from(sectionRef.current, { duration: 1, opacity: 0, y: 300 })
    gsap.from(titleRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.5 })
    gsap.from(firstRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.8 })
    gsap.from(secondRef.current, { duration: 1, opacity: 0, y: 50, delay: 1 })
    gsap.from(buttonRef.current, { duration: 1, opacity: 0, y: 50, delay: 1.5 })
    gsap.from(leftRef.current, { duration: 1, opacity: 0, y: -300 })
  }, [])
  const intervalRef = useRef(null)

  useEffect(() => {
    // Устанавливаем интервал для автопрокрутки
    intervalRef.current = setInterval(() => {
      document.querySelector('button[aria-label="Next"]').click()
    }, 3000) // Автопрокрутка каждые 3 секунды

    // Очищаем интервал при размонтировании компонента
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{ background: 'var(--bg-color)'}}
          className="w-full lg:grid h-screen lg:grid-cols-2  p-6 "
        >
          <div
            ref={leftRef}
            className="hidden lg:block border_container_login glass-background rounded-3xl"
          >
            <div className="flex flex-col justify-around	 h-full">
              <div className=" xl:px-[110px]  lg:px-[50px]	flex flex-col gap-6">
                <div
                  ref={mainTitleRef}
                  className="font-normal	text-6xl	text-white 2xl:text-5xl xl:text-4xl  lg:text-3xl"
                >
                  Увеличьте охваты вашего бренда с помощью брендированной
                  рекламы
                </div>
                <div
                  ref={mainSubtitleRef}
                  className="text-2xl	font-normal	text-white"
                >
                  Brandformance - Платформа Видеорекламы в
                  <span className='text-white ml-1'>You
                    <span className='bg-red-600 p-0.5 rounded-[10px] font-semibold'>Tube</span>
                  </span>
                  <br/>
                  Разместите ваш рекламный ролик буквально в три клика
                </div>
              </div>
              {/* <div className=" flex  gap-2 w-full relative"> */}
              <Swiper
                spaceBetween={20}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className={m.swiper}
                breakpoints={{
                  1000: {
                    slidesPerView: 1.5,
                  },
                  1100: {
                    slidesPerView: 2,
                  },
                  1300: {
                    slidesPerView: 3,
                  },
                }}
              >
                <>
                  {sliderData.map((item, index) => (
                    <SwiperSlide key={index} className={m.slide}>
                      <video
                        src={item.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="rounded-[20px] h-auto"
                      ></video>
                    </SwiperSlide>
                  ))}
                </>
              </Swiper>
            </div>
          </div>
          <div
            ref={sectionRef}
            className="flex items-center justify-center py-12"
          >
            <div className="mx-auto grid w-[450px] gap-6">
              <div  className="grid gap-2 text-center">
                <p
                  className="text-balance text-muted-foreground"
                  style={{ color: ' var(--text-color)' }}
                >
                  Вход в систему
                </p>
                <h1 className="text-[32px] font-bold text-white">
                  Brandformance
                </h1>
              </div>
              <div  className="relative">
                <Input
                  id="login"
                  type="text"
                  {...register('login', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  className={`border-[1px]  rounded-3xl h-[73px] p-[26px] text-white bg-[#0A0F3633] text-base ${
                    errors.login ? 'border-red-500' : 'border-[#123057]'
                  }`}
                  placeholder="Логин"
                  required
                  autoComplete="off"
                />
                <span className="text-red-500 text-sm	">
                  {errors?.login && <p>{errors?.login?.message}</p>}
                </span>
              </div>
              <div  className="relative">
                <Input
                  id="password"
                  type={showPasswordOld ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  className={`border-[1px]  rounded-3xl h-[73px] p-[26px] text-white bg-[#0A0F3633] text-base ${
                    errors.password ? 'border-red-500' : 'border-[#123057]'
                  }`}
                  placeholder="Пароль"
                  required
                  autoComplete="off"
                />
                <span className="text-red-500 text-sm	">
                  {errors?.password && <p>{errors?.password?.message}</p>}
                </span>{' '}
                <div
                  onClick={handleTogglePasswordOld}
                  className="absolute top-[35%] right-[26px] cursor-pointer"
                >
                  {showPasswordOld ? (
                    <Eye className="text-white" />
                  ) : (
                    <EyeOff className="text-white" />
                  )}
                </div>
              </div>
              <div >
                <Button
                  className={`${
                    isValid
                      ? 'bg-[#2A85FF] hover:bg-[#2A85FF99]'
                      : 'bg-[#616161]'
                  } w-full   h-[64px] rounded-3xl text-white`}
                  disabled={!isValid || isLogin}
                >
                  Войти
                  {isLogin && <Loader2 className="ml-2 h-6 w-6 animate-spin" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
