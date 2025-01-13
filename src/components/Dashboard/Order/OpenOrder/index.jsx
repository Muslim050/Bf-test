import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import backendURL from '@/utils/url'
import AddInventory from './AddInventory'
import AddSentPublisher from './AddSentPublisher'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.jsx'
import { hasRole } from '@/utils/roleUtils.js'
import {useAddInventory} from "@/components/Dashboard/Order/OpenOrder/AddInventory/useAddInventory.jsx";
import TableSearchInput from "@/shared/TableSearchInput/index.jsx";
import {useAddSentPublisher} from "@/components/Dashboard/Order/OpenOrder/AddSentPublisher/useAddSentPublisher.jsx";
import axiosInstance from "@/api/api.js";

const OpenOrderTable = ({  expandedRows }) => {
  const dispatch = useDispatch()
  const [selectedRows, setSelectedRows] = React.useState([])
  const [getOrder, setGetOrder] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [activeTab, setActiveTab] = useState( 'inventory'); // Состояние для отслеживания активной вкладки

  const [onceOrder, setOnceOrder] = React.useState([])
  const fetchGetOrder = async () => {
    let page;
    let pageSize;

    page = pagination.pageIndex + 1; // Индексация страниц начинается с 1
    pageSize = pagination.pageSize;

    setIsLoading(true)
    let url = new URL(`${backendURL}/order/${expandedRows}/`)
    const params = new URLSearchParams()
    if (page) {
      params.append('page', page);
    }
    if (pageSize) {
      params.append('page_size', pageSize);
    }
    url.search = params.toString()


    const response = await axiosInstance.get(url.href)
    setGetOrder(response.data.data.inventories)
    setOnceOrder(response.data.data)
    setIsLoading(false)
  }
  const {
    table, // Экземпляр таблицы
    globalFilter,
    setGlobalFilter,
    flexRender,
    pagination,
    open,
    setOpen,
    handleClose,
    selectedInventoryId
  } = useAddInventory(getOrder, onceOrder, fetchGetOrder);

  const {
    table: publisherUsersTable,
    globalFilter: usersGlobalFilter,
    setGlobalFilter: setUsersGlobalFilter,
    flexRender: flexRenderUsers,
    pagination: paginationUsers,
    currentOrder,
    listsentPublisherWithIndex,
    setCurrentOrder
  } = useAddSentPublisher(expandedRows, onceOrder);


  console.log (onceOrder)
  React.useEffect(() => {
    fetchGetOrder()
  }, [dispatch, expandedRows, setOnceOrder, pagination.pageIndex, pagination.pageSize])
  const isDisabled = selectedRows.length === 0
  const [addInventroyModal, setAddInventroyModal] = React.useState(false)

  useEffect(() => {
    if (['accepted', 'open', 'in_review'].includes(onceOrder?.status)) {
      setActiveTab('sentpublisher'); // Установить вкладку 'sentpublisher'
    } else {
      setActiveTab('inventory'); // Установить вкладку 'inventory' для других статусов
    }
  }, [onceOrder?.status]); // Следить за изменением onceOrder.status
  return (
    <>
      {isLoading ? (
        <div className="loaderWrapper" style={{ height: '10vh' }}>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Tabs
            style={{background: 'var(--bg-color)'}}
            className='p-2 rounded-b-3xl'
            value={activeTab} // Управляемая вкладка
            defaultValue="inventory"
                onValueChange={(value) => setActiveTab (value)} // Обновление активной вкладки
          >
            <div className="flex justify-between items-center gap-2">

              <TabsList
                className="grid grid-cols-2 w-[300px] h-auto rounded-[14px]"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
                }}
              >
                <TabsTrigger
                  value="inventory"
                  className="text-[12px] h-[25px] rounded-[12px]"
                >
                  Инвентари
                </TabsTrigger>
                {hasRole ('admin') ? (
                  <TabsTrigger
                    value="sentpublisher"
                    className="text-[12px] h-[25px] rounded-[12px]"
                  >
                    Размещения
                  </TabsTrigger>
                ) : null}

              </TabsList>
              {activeTab === 'inventory' && (
                <div className='flex'>
                  <TableSearchInput
                    value={globalFilter ?? ''}
                    onChange={(value) => setGlobalFilter (String (value))}
                    className={`p-2 font-lg shadow border border-block `}
                  />
                </div>
              )}
              {/*{activeTab === 'sentpublisher' && (*/}
              {/*  <div>*/}
              {/*    <TableSearchInput*/}
              {/*      value={usersGlobalFilter ?? ''}*/}
              {/*      onChange={value => setUsersGlobalFilter (String (value))}*/}
              {/*      className={`p-2 font-lg shadow border border-block `}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>

              <TabsContent
                value="inventory"
                // style={{background: 'var(--bg-color)'}}
                className="rounded-[22px] "
              >

                <AddInventory
                  getOrder={getOrder}
                  setSelectedRows={setSelectedRows}
                  selectedRows={selectedRows}
                  expandedRows={expandedRows}
                  fetchGetOrder={fetchGetOrder}
                  onceOrder={onceOrder} // Передача функции как пропс
                  table={table}
                  flexRender={flexRender}
                  pagination={pagination}
                  open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                  selectedInventoryId={selectedInventoryId}
                />
              </TabsContent>
              <TabsContent
                value="sentpublisher"
                // style={{background: 'var(--bg-color)'}}
                className="rounded-[22px]"
              >

                <AddSentPublisher
                  setSelectedRows={setSelectedRows}
                  selectedRows={selectedRows}
                  expandedRows={expandedRows}
                  setAddInventroyModal={setAddInventroyModal}
                  onceOrder={onceOrder}
                  table={publisherUsersTable}
                  flexRender={flexRenderUsers}
                  pagination={paginationUsers}
                  currentOrder={currentOrder}
                  listsentPublisherWithIndex={listsentPublisherWithIndex}
                  setCurrentOrder={setCurrentOrder}
                />
              </TabsContent>

          </Tabs>

        </>
        )}
    </>
  )
}

export default OpenOrderTable
