import React, { useEffect, useState } from 'react'
import { Loader2, LogIn } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { login } from '@/redux/auth/authSlice.js'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
import Slider from '@/pages/Login/Slider.jsx'
import InputFuild from '@/shared/Form/InputFuild.jsx'
import PasswordInputWithToggle from '@/shared/Form/PasswordInputWithToggle.jsx'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = React.useState(false)

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

  const [showForm, setShowForm] = useState(false)
  useEffect(() => {
    setShowForm(true)
  }, [])
  const animateElementsOut = () =>
    new Promise((resolve) => {
      setShowForm(false)
      setTimeout(resolve, 700)
    })
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
        await animateElementsOut()
        navigate(redirectRoute)
      } else if (logindata.payload.data.error.detail) {
        toast.error(logindata.payload.data.error.detail)
      }

      setIsLogin(false)
    } catch (error) {
      setIsLogin(false)
      toast.error(error?.data?.error?.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div
          style={{ background: 'var(--bg-color)' }}
          className="w-full lg:grid h-screen lg:grid-cols-2  p-6 "
        >
          <div className="hidden lg:block border_container_login glass-background rounded-3xl">
            <div className="flex flex-col justify-around	 h-full">
              <div className=" xl:px-[110px]  lg:px-[50px]	flex flex-col gap-6">
                <div className="font-normal	text-6xl	text-white 2xl:text-5xl xl:text-4xl  lg:text-3xl">
                  Увеличьте охваты вашего бренда с помощью брендированной
                  рекламы
                </div>
                <div className="text-2xl	font-normal	text-white">
                  Brandformance - Платформа Видеорекламы в
                  <span className="text-white ml-1">
                    You
                    <span className="bg-red-600 p-0.5 rounded-[10px] font-semibold">
                      Tube
                    </span>
                  </span>
                  <br />
                  Разместите ваш рекламный ролик буквально в три клика
                </div>
              </div>

              <div className="relative">
                <Slider />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-12">
            <div
              className={`
              mx-auto grid w-[450px] gap-6
              transition-all duration-700 ease-in-out
              ${
                showForm
                  ? 'opacity-100 duration-500 translate-y-0'
                  : 'opacity-0 duration-500 translate-y-10 pointer-events-none'
              }
            `}
            >
              <div className="grid gap-2 text-center">
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
              <InputFuild
                id="login"
                type="text"
                register={register('login', {
                  required: 'Поле обезательно к заполнению',
                })}
                error={errors.login}
                placeholder="Логин"
              />
              <PasswordInputWithToggle
                register={register('password', {
                  required: 'Поле обезательно к заполнению',
                })}
                error={errors.password}
              />
              <div>
                <Button
                  variant="default"
                  className="w-full flex gap-1 h-[65px]"
                  disabled={!isValid || isLogin}
                >
                  <LogIn />
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
