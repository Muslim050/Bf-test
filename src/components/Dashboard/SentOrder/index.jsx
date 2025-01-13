import React from 'react'
import ReceivedOrders from './receivedOrders'
import CompletedOrder from './сompletedOrders/'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.jsx'
import {useReceived} from "@/components/Dashboard/SentOrder/receivedOrders/useReceived.jsx";

function SentOrder() {




  const {
    table, // Экземпляр таблицы
    globalFilter,
    setGlobalFilter,
    flexRender,
    pagination,
    renderSubComponent

  } = useReceived();





  return (
    <>
      <Tabs defaultValue="sent">
        <TabsList
          className="grid grid-cols-2 w-[300px] h-auto rounded-[14px] mt-2"
          style={{
            background:
              'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
          }}
        >
          <TabsTrigger
            value="sent"
            className="text-[12px] h-[25px] rounded-[12px]"
          >
            Полученные заказы
          </TabsTrigger>
          <TabsTrigger
            value="complited"
            className="text-[12px] h-[25px] rounded-[12px]"
          >
            Завершенные заказы
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sent">
          <ReceivedOrders
            table={table}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          flexRender={flexRender}
          pagination={pagination}
          renderSubComponent={renderSubComponent}/>
        </TabsContent>
        <TabsContent value="complited">
          <CompletedOrder />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default SentOrder
