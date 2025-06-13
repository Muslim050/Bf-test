// components/InputFuild.jsx
import { Input } from '@/components/ui/input'

const InputFuild = ({
  id,
  type = 'text',
  register,
  error,
  placeholder,
  ...props
}) => (
  <div className="relative">
    <Input
      id={id}
      type={type}
      {...register}
      className={`border-[1px] rounded-2xl h-[73px] p-[26px] text-white bg-[#0A0F3633] text-base ${
        error ? 'border-red-500' : 'border-[#123057]'
      }`}
      placeholder={placeholder}
      autoComplete="off"
      {...props}
    />
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
  </div>
)

export default InputFuild
