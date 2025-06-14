import { useDispatch } from 'react-redux'
import { inventoryPublish } from '../../../../redux/inventory/inventorySlice.js'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import { fetchVideos } from '@/redux/video/videoSlice.js'
import InputFuild from '@/shared/Form/InputFuild.jsx'
import { Paperclip } from 'lucide-react'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'

export default function LinkedVideo({ selectedId, onClose }) {
  const dispatch = useDispatch()
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      selectedId,
      linkvideo: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    try {
      const videoLinkResponse = await dispatch(
        inventoryPublish({ data }),
      ).unwrap()
      toast.success('Пользователь рекламодателя успешно создан!')
      onClose()
      setTimeout(async () => {
        await fetchVideos()
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
          <div className="flex justify-between gap-2 items-end">
            <div className="w-full">
              <Label className="text-sm	text-white pb-2 flex gap-0.5">
                Ссылка на Видео<span className="text-red-500 ml-0.5">*</span>
                <div className="text-sm	text-red-500 ">
                  {errors?.email && <p>{errors.email.message}</p>}
                </div>
              </Label>
              <InputFuild
                name="linkvideo"
                control={control}
                rules={{ required: 'Поле обезательно к заполнению' }}
                error={errors.linkvideo}
                placeholder="Прикрепите ссылку на видео"
              />
            </div>
            <TooltipWrapper tooltipContent="Прикрепить ссылку">
              <Button
                isValid={true}
                className="h-10"
                variant={'default'}
                disabled={!isValid}
              >
                <Paperclip />
              </Button>
            </TooltipWrapper>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
