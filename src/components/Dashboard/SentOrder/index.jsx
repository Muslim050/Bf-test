import React from 'react'
import ReceivedOrders from './receivedOrders'
import CompletedOrder from './сompletedOrders/'
import {Tabs, TabsContent, TabsList, TabsTrigger,} from '@/components/ui/tabs.jsx'
import {useReceived} from "@/components/Dashboard/SentOrder/receivedOrders/useReceived.jsx";
import DeactivatedInventory from "@/components/Dashboard/SentOrder/deactivatedInventory/index.jsx";

function SentOrder() {
  const {
    table, // Экземпляр таблицы
    globalFilter,
    setGlobalFilter,
    flexRender,
    pagination,
    renderSubComponent,
  } = useReceived();


  return (
    <>
      <Tabs defaultValue="sent">
        <TabsList
          className="grid grid-cols-3 w-[500px] h-auto rounded-[14px] mt-2"
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
          <TabsTrigger
            value="deactivated"
            className="text-[12px] h-[25px] rounded-[12px]"
          >
            Завершенные инвентари
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sent">
          <ReceivedOrders
            table={table}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          flexRender={flexRender}
          pagination={pagination}
          renderSubComponent={renderSubComponent}
          />
        </TabsContent>
        <TabsContent value="complited">
          <CompletedOrder />
        </TabsContent>
        <TabsContent value="deactivated">
          <DeactivatedInventory
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            flexRender={flexRender}
            pagination={pagination}
            renderSubComponent={renderSubComponent}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default SentOrder
