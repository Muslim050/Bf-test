// components/InputFuild.jsx
import { Input } from '@/components/ui/input'
import { Controller } from 'react-hook-form'

const InputFuild = ({
  name,
  control,
  rules,
  error,
  placeholder,
  className = '',
  type = 'text',
  formatNumber = false,
  ...props
}) => (
  <div className="relative">
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Input
          {...field}
          type={type}
          id={name}
          value={field.value || ''}
          onChange={(e) => {
            if (formatNumber) {
              // Берём только цифры
              const rawValue = e.target.value.replace(/\D/g, '')
              field.onChange(rawValue ? parseInt(rawValue, 10) : '')
            } else {
              field.onChange(e.target.value)
            }
          }}
          className={`${className} border   transition-all duration-300 text-sm ${
            error ? 'border-red-500 bg-red-300' : 'border-transparent'
          }`}
          placeholder={placeholder}
          autoComplete="off"
          {...props}
        />
      )}
    />
    {/*{error && <span className="text-red-500 text-sm">{error.message}</span>}*/}
  </div>
)

export default InputFuild
// h-[73px] p-[26px]
