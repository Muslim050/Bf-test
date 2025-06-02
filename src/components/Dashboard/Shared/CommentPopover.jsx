import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Copy, MessageSquareText, SquareArrowOutUpRight } from 'lucide-react'
import React from 'react'
import { useOrder } from '@/components/Dashboard/Order/OrderTable/hooks/useOrder.jsx'

const CommentPopover = ({ data }) => {
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const { copyToClipboard } = useOrder(currentOrder)

  return (
    <div>
      {data?.notes || data?.notes_text ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={() => {
                setCurrentOrder(data)
              }}
              variant="ghost"
            >
              <MessageSquareText />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-4 bg-white bg-opacity-30 backdrop-blur-md">
            <div className="flex justify-between items-center">
              <div className="text-lg	font-medium	text-[var(--text)] ">
                Комментарий
              </div>

              <Button variant="secondary" onClick={copyToClipboard}>
                <Copy />
              </Button>
            </div>
            <p className="text-sm text-white break-words pt-4">
              {data.notes || data.notes_text}
            </p>
            {data.notes_url && (
              <a
                target="_blank"
                className={`no-underline text-[#A7CCFF] font-semibold hover:text-[#3282f1] hover:underline flex gap-1 mt-4`}
                href={data.notes_url}
              >
                {data.notes_url}
                <SquareArrowOutUpRight className="size-4" />
              </a>
            )}
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  )
}

export default CommentPopover
