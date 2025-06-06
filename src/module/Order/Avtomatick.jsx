import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { updateDeactivateInventory } from '@/redux/inventory/inventorySlice.js'
import { useDispatch } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { PackageCheck } from 'lucide-react'

const Avtomatick = ({ fetchGetOrder, row }) => {
  const dispatch = useDispatch()

  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [selectedRow, setSelectedRow] = React.useState(null)

  const handleSwitchChange = (rowData) => {
    console.log('HANDLE SWITCH', rowData)
    dispatch(
      updateDeactivateInventory({
        inventory_id: rowData.id,
        is_auto_deactivation_mode: !rowData.is_auto_deactivation_mode,
      }),
    ).then(() => {
      fetchGetOrder()
    })
  }
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Switch
            id="airplane-mode"
            checked={row.is_auto_deactivation_mode}
            onCheckedChange={() => {
              setSelectedRow(row)
              setConfirmOpen(true)
            }}
          />
        </TooltipTrigger>
        <TooltipContent className="flex flex-col gap-2">
          {row?.is_auto_deactivation_mode
            ? 'Режим автозавершения включен!'
            : 'Режим автозавершения выключен!'}
        </TooltipContent>
      </Tooltip>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Модерация рекламы</DialogTitle>
          </DialogHeader>
          <DialogHeader className="mb-4">
            <DialogTitle>
              {selectedRow?.is_auto_deactivation_mode
                ? 'Вы точно хотите отключить режим автозавершения?'
                : 'Вы точно хотите включить режим автозавершения?'}
            </DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  onClick={() => {
                    handleSwitchChange(selectedRow)
                    setConfirmOpen(false)
                  }}
                  type="submit"
                >
                  <PackageCheck />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex flex-col gap-2">
                Подтвердить
              </TooltipContent>
            </Tooltip>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Avtomatick
