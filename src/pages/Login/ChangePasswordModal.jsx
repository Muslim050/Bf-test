import React from 'react'
import { useDispatch } from 'react-redux'
import style from './ChangePasswordModal.module.scss'
import { changePassword, logout } from '../../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import InputUI from '../../components/Labrery/InputUI/InputUI'
import { Eye, EyeOff, X } from 'lucide-react'
import Cookies from 'js-cookie'

import { hideModalChangePassword } from '@/redux/modalSlice'
import toast from 'react-hot-toast'

function ChangePasswordModal() {
  const dispatch = useDispatch()
  const userID = Cookies.get('channelId')
  const [isOrderCreated, setIsOrderCreated] = React.useState(false)
  const [showPasswordOld, setShowPasswordOld] = React.useState(false)
  const [showPasswordNew, setShowPasswordNew] = React.useState(false)
  const [showPasswordConf, setShowPasswordConf] = React.useState(false)

  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })
  const handleButtonClick = () => {
    dispatch(hideModalChangePassword())
  }
  const handleTogglePasswordOld = () => {
    setShowPasswordOld(!showPasswordOld)
  }
  const handleTogglePasswordNew = () => {
    setShowPasswordNew(!showPasswordNew)
  }
  const handleTogglePasswordConf = () => {
    setShowPasswordConf(!showPasswordConf)
  }
  const handleChangePassword = async (data) => {
    try {
      setIsOrderCreated(true)
      const { newPassword, confirmPassword } = data
      if (newPassword !== confirmPassword) {
        toast.error('Пароли не совпадают.')
        setIsOrderCreated(false)
        return
      }

      const response = await dispatch(changePassword({ data, id: userID }))
      if (response.payload.message === 'Success') {
        dispatch(hideModalChangePassword())
        navigate('/login')
        dispatch(logout())
      }
    } catch (error) {
      dispatch(hideModalChangePassword())
    }
  }

  return (
    <>
      <div className="modalWindow__title">
        Сменить пароль
        <X className="modalWindow__title__button" onClick={handleButtonClick} />
      </div>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <div style={{ width: '400px', marginBottom: '40px' }}>
          <InputUI
            type={showPasswordOld ? 'text' : 'password'}
            placeholder="Старый пароль"
            autoComplete="off"
            register={register}
            name="oldPassword"
            errors={errors.oldPassword}
            inputWidth
            endAdornment={
              <div
                onClick={handleTogglePasswordOld}
                style={{ display: 'flex' }}
              >
                {showPasswordOld ? (
                  <Eye style={{ width: '20px' }} />
                ) : (
                  <EyeOff style={{ width: '20px' }} />
                )}
              </div>
            }
          />

          <InputUI
            type={showPasswordNew ? 'text' : 'password'}
            placeholder="Новый пароль"
            autoComplete="off"
            register={register}
            name="newPassword"
            errors={errors.newPassword}
            inputWidth
            endAdornment={
              <div
                onClick={handleTogglePasswordNew}
                style={{ display: 'flex' }}
              >
                {showPasswordNew ? (
                  <Eye style={{ width: '20px' }} />
                ) : (
                  <EyeOff style={{ width: '20px' }} />
                )}
              </div>
            }
          />

          <InputUI
            type={showPasswordConf ? 'text' : 'password'}
            placeholder="Подтвердите пароль"
            autoComplete="off"
            register={register}
            name="confirmPassword"
            errors={errors.confirmPassword}
            inputWidth
            endAdornment={
              <div
                onClick={handleTogglePasswordConf}
                style={{ display: 'flex' }}
              >
                {showPasswordConf ? (
                  <Eye style={{ width: '20px' }} />
                ) : (
                  <EyeOff style={{ width: '20px' }} />
                )}
              </div>
            }
          />
        </div>

        <div className={style.btn__wrapper}>
          <button
            style={{ display: 'flex', alignItems: 'center' }}
            type="submit"
            disabled={!isValid || isOrderCreated}
            className={
              isValid && !isOrderCreated
                ? style.btn__wrapper__btn
                : style.btn__wrapper__disabled
            }
          >
            {isOrderCreated ? (
              <>
                <span>Изменить</span>
                <div className={style.loaderWrapper}>
                  <div className={style.spinner}></div>
                </div>
              </>
            ) : (
              <span>Изменить</span>
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default ChangePasswordModal
