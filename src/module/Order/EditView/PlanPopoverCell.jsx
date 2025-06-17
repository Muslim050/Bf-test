import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { Plus } from 'lucide-react'
import PopoverEditViewIventory from '@/module/Order/EditView/PopoverEditViewIventory.jsx'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import { Button } from '@/components/ui/button.jsx' // или нужный вам импорт

// Отдельный компонент для ячейки с Popover
const PlanPopoverCell = ({ row, fetchGetOrder }) => {
  const [openPopover, setOpenPopover] = useState(false)
  return (
    <div className="flex items-center gap-4">
      <div className="w-[80px]">
        <FormatterView data={row.original.expected_number_of_views} />
      </div>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            className="h-auto"
            disabled={row.original.status === 'inactive'}
            onClick={() => setOpenPopover(true)}
          >
            <Plus className="w-4 h-4 font-semibold" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-50 bg-white bg-opacity-30 backdrop-blur-md rounded-2xl p-3">
          <PopoverEditViewIventory
            item={row}
            setOpenPopover={setOpenPopover}
            fetchGetOrder={fetchGetOrder}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default PlanPopoverCell
