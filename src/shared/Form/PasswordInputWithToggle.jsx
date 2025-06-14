import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import InputFuild from '@/shared/Form/InputFuild.jsx'

const PasswordInputWithToggle = ({
  register,
  error,
  placeholder = 'Пароль',
  control,
  ...props
}) => {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <InputFuild
        id="password"
        type={show ? 'text' : 'password'}
        register={register}
        error={error}
        placeholder={placeholder}
        control={control}
        {...props}
      />
      <div
        onClick={() => setShow((prev) => !prev)}
        className="absolute top-[35%] right-[26px] cursor-pointer"
      >
        {show ? (
          <Eye className="text-white" />
        ) : (
          <EyeOff className="text-white" />
        )}
      </div>
    </div>
  )
}

export default PasswordInputWithToggle
