import { useDispatch } from 'react-redux'
import { inventoryPublish } from '../../../../redux/inventory/inventorySlice.js'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import { fetchVideos } from '@/redux/video/videoSlice.js'

export default function LinkedVideo({ selectedId, onClose }) {
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      selectedId,
      linkvideo: '',
    },
    mode: 'onBlur',
  })

  const onSubmit = async (data) => {
    try {
      const videoLinkResponse = await dispatch(
        inventoryPublish({ data }),
      ).unwrap()
      toast.success('Пользователь рекламодателя успешно создан!')
      onClose()
      setTimeout(() => {
        dispatch(fetchVideos())
      }, 1000)
    } catch (error) {
      toast.error(error?.data?.error?.message)
    }
  }
  return (
    <>
      <DialogContent
        className="w-[450px] p-4"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg	font-medium	text-white border-b border-[#F9F9F926] pb-4">
            Прикрепить ссылку
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <Label className="text-sm	text-white pb-2 flex gap-0.5">
                Ссылка на Видео<span className="text-red-500 ml-0.5">*</span>
                <div className="text-sm	text-red-500 ">
                  {' '}
                  {errors?.email && <p>{errors.email.message}</p>}
                </div>
              </Label>
              <Input
                className={`border ${
                  errors?.email ? 'border-red-500' : 'border-gray-300'
                }   transition-all duration-300 text-sm `}
                type="text"
                placeholder="Прикрепите ссылку на видео"
                autoComplete="off"
                {...register('linkvideo', {
                  required: 'Поле обезательно к заполнению',
                })}
              />
            </div>

            <Button
              isValid={true}
              className={`${
                isValid
                  ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                  : 'bg-[#616161]'
              } w-full   h-[44px] text-white rounded-lg	mt-8`}
              disabled={!isValid}
            >
              Прикрепить
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
