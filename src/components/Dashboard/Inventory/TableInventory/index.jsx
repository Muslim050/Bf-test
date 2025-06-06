import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchInventory,
  resetInventory,
} from '@/redux/inventory/inventorySlice.js'
import { fetchChannel } from '@/redux/channel/channelSlice.js'

import PreLoadDashboard from '@/components/Dashboard/PreLoadDashboard/PreLoad.jsx'
import TableSearchInput from '@/shared/TableSearchInput/index.jsx'
import { useInventory } from '@/components/Dashboard/Inventory/TableInventory/useInventory.jsx'
import Pagination from '@/module/Pagination/index.jsx'
import TablePagination from '@/module/TablePagination/index.jsx'
import FilterMain from '@/components/Dashboard/Inventory/module/FilterMain.jsx'
import SelectedFilter from '@/components/Dashboard/Inventory/module/SelectedFilter.jsx'

function TableInventory() {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.inventory)
  const [selectedAdvName, setSelectedAdvName] = React.useState(null)
  const [filterLoading, setFilterLoading] = React.useState(false)
  const [selectedOptionChannel, setSelectedOptionChannel] = React.useState('')
  const [selectedFormat, setSelectedFormat] = React.useState('')
  const [selectedChannel, setSelectedChannel] = React.useState(null)
  const [selectedChannelName, setSelectedChannelName] = React.useState(null)
  const { channel } = useSelector((state) => state.channel)

  const [loading, setLoading] = React.useState(true)
  const {
    table, // Экземпляр таблицы
    globalFilter,
    setGlobalFilter,
    flexRender,
    pagination,
  } = useInventory()

  const handleSelectFormat = (value) => {
    setSelectedFormat(value)
  }
  const handleSelectChange = (value) => {
    setSelectedOptionChannel(value)
    if (value) {
      const option = JSON.parse(value)
      setSelectedChannel(option.id)
      setSelectedChannelName(option.name)
    } else {
      setSelectedChannel(null)
      setSelectedChannelName('')
    }
  }
  const handleClear = () => {
    setFilterLoading(true)
    setSelectedChannel(null)
    setSelectedOptionChannel('')
    setSelectedAdvName('')
    setSelectedChannelName(null)
    setSelectedFormat('')
    dispatch(resetInventory()) // Dispatch the reset action
    setFilterLoading(false)
    dispatch(fetchInventory({}))
  }
  const handleSearch = () => {
    setFilterLoading(true)
    dispatch(
      fetchInventory({
        id: selectedChannel,
        format: selectedFormat,
        page: pagination.pageIndex + 1, // API использует нумерацию с 1
        pageSize: pagination.pageSize,
      }),
    )
      .then(() => {
        setFilterLoading(false)
      })
      .catch(() => {
        setFilterLoading(false) // Ensure loading is reset on error
      })
  }
  React.useEffect(() => {
    dispatch(
      fetchChannel({
        page: 1, // API использует нумерацию с 1
        pageSize: 100,
      }),
    )
  }, [dispatch])

  React.useEffect(() => {
    dispatch(
      fetchInventory({
        page: pagination.pageIndex + 1, // API использует нумерацию с 1
        pageSize: pagination.pageSize,
      }),
    ).then(() => setLoading(false))
  }, [dispatch, pagination.pageIndex, pagination.pageSize])

  return (
    <>
      {status === 'loading' || loading ? (
        <PreLoadDashboard
          onComplete={() => setLoading(false)}
          loading={loading}
          text={'Загрузка инвентарей'}
        />
      ) : (
        <div className="">
          <div className="tableWrapper__table_title">
            <div className="flex items-center justify-end w-full">
              <div className="flex items-end gap-2.5">
                {filterLoading && (
                  <div className="loaderWrapper" style={{ height: '5vh' }}>
                    <div
                      className="spinner"
                      style={{ width: '25px', height: '25px' }}
                    ></div>
                  </div>
                )}
                <div className="flex justify-end mt-3">
                  <TableSearchInput
                    value={globalFilter ?? ''}
                    onChange={(value) => setGlobalFilter(String(value))}
                    className={`p-2 font-lg shadow border border-block `}
                  />
                </div>

                {/*Выбранные фильтры*/}
                <SelectedFilter
                  selectedChannel={selectedChannel}
                  selectedFormat={selectedFormat}
                  selectedChannelName={selectedChannelName}
                  handleClear={handleClear}
                />
                {/*Выбранные фильтры*/}

                {/*Фильтр*/}
                <FilterMain
                  channel={channel}
                  selectedOptionChannel={selectedOptionChannel}
                  selectedFormat={selectedFormat}
                  handleSelectFormat={handleSelectFormat}
                  handleSelectChange={handleSelectChange}
                  selectedChannel={selectedChannel}
                  handleSearch={handleSearch}
                  handleClear={handleClear}
                />
                {/*Фильтр*/}
              </div>
            </div>
          </div>

          {/*Таблица*/}

          <div className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
            <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
              <TablePagination
                table={table}
                flexRender={flexRender}
                text="создайте инвентарь"
              />
            </div>
          </div>
          <Pagination table={table} pagination={pagination} />
        </div>
      )}
    </>
  )
}

export default TableInventory
