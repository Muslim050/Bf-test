import React from 'react'
import AddVideo from './AddVideo'
import SelectedVideo from './SelectedVideo'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.jsx'

export default function ModalSentOrder({
  setOpenPopoverIndex,
  item,
  setIsPopoverOpen,
}) {
  return (
    <>
      <div className="">
        <div className="text-white text-xl	mb-4	font-medium	">Размещение</div>

        <Tabs defaultValue="advertiser">
           <TabsList
             className="grid grid-cols-2 w-full h-auto rounded-2xl my-4"
             style={{
               background:
                 'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
             }}
           >
             <TabsTrigger value="advertiser" className="h-[25px] rounded-2xl">
               Создать видео
             </TabsTrigger>
             <TabsTrigger value="advertiser-users" className='h-[25px]  rounded-2xl'>Выбрать видео</TabsTrigger>
           </TabsList>

          <TabsContent value="advertiser">
            <AddVideo
              item={item}
              setOpenPopoverIndex={setOpenPopoverIndex}
              setIsPopoverOpen={setIsPopoverOpen}
            />
          </TabsContent>
          <TabsContent value="advertiser-users">
            <SelectedVideo
              item={item}
              setOpenPopoverIndex={setOpenPopoverIndex}
              setIsPopoverOpen={setIsPopoverOpen}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
