import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import backendURL from '@/utils/url.js'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import Cookies from 'js-cookie'
import { Check } from 'lucide-react'

const PopoverEditViewIventory = ({ setOpenPopover, fetchGetOrder, item }) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    watch,
    control,
  } = useForm({
    defaultValues: {
      ordered_number_of_views: '',
    },
    mode: 'onChange',
  })

  const expectedView = watch('ordered_number_of_views')

  const onSubmit = async () => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/inventory/update-expected-views-count-view`,
        {
          inventory_id: item.original.id,
          expected_number_of_views: expectedView,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.data) {
        toast.success('Данные успешно обновлены!')
        setOpenPopover(false) // Закрываем Popover
        await fetchGetOrder()
      }
    } catch (error) {
      toast.error(error?.data?.error?.message)
    }
  }

  return (
    <div>
      <div className="text-sm pb-2	text-white border-b border-[#ffffff63]">
        Редактировать показы
      </div>

      <div className=" mt-2 items-center gap-2 flex">
        <Controller
          name="ordered_number_of_views"
          control={control}
          rules={{
            required: 'Поле обязательно к заполнению',
          }}
          defaultValue=""
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <Input
              type="text"
              value={value.toLocaleString('en-US')}
              className={`border ${
                errors?.ordered_number_of_views
                  ? 'border-red-500'
                  : 'border-gray-300'
              } transition-all duration-300 text-sm w-[130px]`}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, '')
                const newValue = rawValue ? parseInt(rawValue, 10) : ''
                onChange(newValue)
              }}
              onBlur={onBlur}
              name={name}
              ref={ref}
              placeholder="Количество показов"
              autoComplete="off"
              step="1000"
            />
          )}
        />
        <Button
          variant="default"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          isValid={true}
        >
          <Check />
        </Button>
      </div>
    </div>
  )
}

export default PopoverEditViewIventory
