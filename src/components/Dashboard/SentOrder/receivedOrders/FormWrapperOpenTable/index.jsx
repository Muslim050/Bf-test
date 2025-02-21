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


export const FormWrapper = ({isPopoverOpen, setIsPopoverOpen, item}) => {
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
        <div className="flex justify-end">
          <PopoverTrigger asChild>
            <button
              onClick={() => setIsPopoverOpen (true)}
              className={` hover:scale-105  transition-all h-auto px-2 py-1 hover:text-white rounded-lg flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 border border-transparent hover:border-orange-700`}
            >

              <PackagePlus/>
              Добавить размещение
              {hasRole ('channel') || hasRole ('publisher') ? (
                <div className="absolute top-0 right-0">
                  {item.order_status === 'in_review' ||
                  item.order_status === 'confirmed' ? (
                    <span className="relative flex h-3 w-3">
                            <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                          </span>
                  ) : null}
                </div>
              ) : null}
            </button>
          </PopoverTrigger>
        </div>
        {isPopoverOpen && (
          <PopoverContent
            side="left"
            align="start"
            className="w-[400px] bg-white bg-opacity-30 backdrop-blur-md rounded-xl"
          >
            <ModalSentOrder
              setIsPopoverOpen={setIsPopoverOpen}
              item={item}
            />
          </PopoverContent>
        )}
      </Popover>
    )
  }




  return (
    <Drawer open={isPopoverOpen} onOpenChange={setIsPopoverOpen} >
      <DrawerTrigger asChild>
        <button
          onClick={() => setIsPopoverOpen (true)}
          className={` hover:scale-105  transition-all h-auto px-2 py-1 hover:text-white rounded-lg flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 border border-transparent hover:border-orange-700`}
        >

          <PackagePlus/>
          Добавить размещение
          {hasRole ('channel') || hasRole ('publisher') ? (
            <div className="absolute top-0 right-0">
              {item.order_status === 'in_review' ||
              item.order_status === 'confirmed' ? (
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
      {isPopoverOpen && (
        <DrawerContent
          side="left"
          align="start"
          className="w-full p-4 bg-white bg-opacity-30 backdrop-blur-md rounded-xl"
        >
          <ModalSentOrder
            setIsPopoverOpen={setIsPopoverOpen}
            item={item}
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Закрыть</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      )}

    </Drawer>
  )


}

