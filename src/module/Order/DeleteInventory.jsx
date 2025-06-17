import React from 'react'
import { Trash2 } from 'lucide-react'
import { deleteInventory } from '@/redux/inventory/inventorySlice.js'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button.jsx'
import TooltipWrapper from '@/shared/TooltipWrapper.jsx'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import toast from 'react-hot-toast'
import { toastConfig } from '@/utils/toastConfig.js'

const DeleteInventory = ({ fetchGetOrder, row }) => {
  const dispatch = useDispatch()

  const [selectedRow, setSelectedRow] = React.useState(null)

  const handleDelete = (rowData) => {
    try {
      dispatch(
        deleteInventory({
          id: rowData.id,
        }),
      ).then(() => {
        fetchGetOrder()
      })
      toast.success('Инвентарь успешно удален!', toastConfig)
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            onClick={() => {
              setSelectedRow(row)
            }}
            className="relative flex gap-1"
          >
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить инвентарь!</AlertDialogTitle>
            <AlertDialogDescription>
              Вы действительно хотите удалить этот инвентарь?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction className="p-0">
              <TooltipWrapper tooltipContent="Удалить">
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(selectedRow)
                  }}
                  className="relative flex gap-1"
                >
                  <Trash2 />
                </Button>
              </TooltipWrapper>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default DeleteInventory
