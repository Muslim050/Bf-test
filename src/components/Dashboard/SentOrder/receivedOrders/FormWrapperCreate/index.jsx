import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {PackagePlus} from "lucide-react";
import {hasRole} from "@/utils/roleUtils.js";
import ModalSentOrder from "@/components/Dashboard/SentOrder/receivedOrders/ModalSentOrder/index.jsx";
import React from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer.jsx";
import {Button} from "react-day-picker";


export const FormWrapperCreate = ({isPopoverOpen, setIsPopoverOpen, row, setIsPopoverOpenData}) => {
  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768)

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isDesktop) {
    return (
      <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            onClick={() => {
              setIsPopoverOpen(true)
              setIsPopoverOpenData(row.original)
            }}
            className="hover:scale-125 transition-all relative"
          >
            <PackagePlus className={`hover:text-orange-500 ${row.original.order_status === 'in_review' || row.original.order_status === 'confirmed' && 'text-green-400'}` } />
            {hasRole('channel') || hasRole('publisher') ? (
              <div className="absolute -top-2 -right-1">
                {row.original.order_status === 'in_review' ||
                row.original.order_status === 'confirmed' ? (
                  <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                ) : null}
              </div>
            ) : null}
          </button>
        </PopoverTrigger>
        <PopoverContent side="left" align="start" className="w-[400px] bg-white bg-opacity-30 backdrop-blur-md rounded-xl">
          <ModalSentOrder setIsPopoverOpen={setIsPopoverOpen} item={row?.original} />
        </PopoverContent>
      </Popover>
    )
  }




  return (
    <Drawer open={isPopoverOpen} onOpenChange={setIsPopoverOpen} >
      <DrawerTrigger asChild>
        <button
          onClick={() => {
            setIsPopoverOpen (true)
            setIsPopoverOpenData (row.original)
          }}
          className="hover:scale-125 transition-all relative"
        >
          <PackagePlus
            className={`hover:text-orange-500 ${row.original.order_status === 'in_review' || row.original.order_status === 'confirmed' && 'text-green-400'}`}/>
          {hasRole ('channel') || hasRole ('publisher') ? (
            <div className="absolute -top-2 -right-1">
              {row.original.order_status === 'in_review' ||
              row.original.order_status === 'confirmed' ? (
                <span className="relative flex h-3 w-3">
                              <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
              ) : null}
            </div>
          ) : null}
        </button>
      </DrawerTrigger>
        <DrawerContent
          side="left"
          align="start"
          className="w-full p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-xl"
        >
          <ModalSentOrder setIsPopoverOpen={setIsPopoverOpen} item={row?.original} />

          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Закрыть</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>


    </Drawer>
  )


}

