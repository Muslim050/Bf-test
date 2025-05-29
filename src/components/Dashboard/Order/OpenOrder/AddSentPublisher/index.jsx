import style from '@/components/Dashboard/Order/OpenOrder/BindingOrderModal.module.scss'
import React from 'react'
import AddSendPublisherModal from './modal/AddSendPublisherModal'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button.jsx'
import { ChevronDown, ChevronsUpDown, ChevronUp, Plus, X } from 'lucide-react'
import EditSendPublisherModal from '@/components/Dashboard/Order/OpenOrder/AddSentPublisher/modal/EditSendPublisherModal/index.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import Pagination from '@/components/module/Pagination/index.jsx'
import InfoCartSentPublisher from '@/components/Dashboard/Order/OpenOrder/AddSentPublisher/InfoCartSentPublisher.jsx'

export default function AddSentPublisher({
  expandedRows,
  onceOrder,
  table,
  flexRender,
  currentOrder,
  setCurrentOrder,
  pagination,
  listsentPublisherWithIndex,
  editNote,
  setEditNote,
}) {
  const { textColor } = React.useContext(ThemeContext)

  const [viewNote, setViewNote] = React.useState(false)
  // const [editNote, setEditNote] = React.useState(false)

  const [totalOnlineView, setTotalOnlineView] = React.useState(0)
  React.useEffect(() => {
    const total = listsentPublisherWithIndex?.reduce(
      (acc, advert) => acc + (advert?.online_views || 0),
      0,
    )
    setTotalOnlineView(total)
  }, [listsentPublisherWithIndex])
  const isDataEmpty = table.getPrePaginationRowModel().rows.length === 0
  const isFilteredEmpty = table.getRowModel().rows.length === 0

  return (
    <div className={` rounded-[22px]  relative`}>
      {/*Добавление новой записи*/}

      {/* кнопка крестик чтобы закрыть создание записи */}
      {viewNote ? (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => setViewNote(false)}
            className=" px-1 h-[30px] group rounded-lg  gap-2 hover:bg-red-300"
          >
            <X className="hover:text-red-600   transform group-hover:scale-125 transition-transform" />
          </Button>
        </div>
      ) : null}
      {/* кнопка крестик чтобы закрыть создание записи */}

      <div>
        <Table
          className={`${style.responsive_table} border_design rounded-[22px] overflow-auto`}
        >
          {viewNote && (
            <div className="grid grid-cols-5 gap-4">
              <TableHeader className="col-span-5 grid grid-cols-5 bg-[#FFFFFF2B] rounded-t-lg"></TableHeader>
            </div>
          )}
          <TableBody>
            {viewNote && (
              <TableRow
                initial={{ opacity: 0, x: -10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5 }}
              >
                <AddSendPublisherModal
                  expandedRows={expandedRows}
                  setViewNote={setViewNote}
                  onceOrder={onceOrder}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>

        {editNote ? null : (
          <>
            {viewNote ? null : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="default"
                  onClick={() => setViewNote(!viewNote)}
                >
                  <div className="flex items-center justify-center gap-2 ">
                    <Plus className="transform group-hover:scale-125 transition-transform" />
                    Добавить запись
                  </div>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      {/*Добавление новой записи*/}

      {/*Редактирование записи*/}

      {/* кнопка крестик чтобы закрыть создание записи */}
      {editNote ? (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setEditNote(false)
              setCurrentOrder(null) // Сбрасываем выделенную строку
            }}
            className=" px-1 h-[30px] group rounded-lg  gap-2 hover:bg-red-300"
          >
            <X className="hover:text-red-600   transform group-hover:scale-125 transition-transform" />
          </Button>
        </div>
      ) : null}
      {/* кнопка крестик чтобы закрыть создание записи */}

      <div>
        <Table
          className={`${style.responsive_table} border_design rounded-[22px] overflow-auto`}
        >
          {editNote && (
            <div className="grid grid-cols-5 gap-4">
              <TableHeader className="col-span-5 grid grid-cols-5 bg-[#FFFFFF2B] rounded-t-lg"></TableHeader>
            </div>
          )}
          <TableBody>
            {editNote && (
              <TableRow
                initial={{ opacity: 0, x: -10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5 }}
              >
                <EditSendPublisherModal
                  item={currentOrder}
                  setEditNote={setEditNote}
                  expandedRows={expandedRows}
                  setCurrentOrder={setCurrentOrder}
                  onCancel={() => setCurrentOrder(null)}
                  onSave={(updatedData) => {
                    setCurrentOrder(null)
                    // Обновите данные таблицы при необходимости
                  }}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/*Редактирование новой записи*/}

      {/*Данные */}
      <div className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
        <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
          <Table
            className={`${style.responsive_table} border_design rounded-lg `}
          >
            <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg justify-between">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`text-${textColor} ${header.column.getIsSorted() ? 'underline ' : ''}`}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex flex-col justify-center h-full py-2">
                            {header.column.id === 'edit' ? null : (
                              <div
                                className={`flex items-center ${
                                  header.column.getCanSort()
                                    ? 'cursor-pointer select-none'
                                    : ''
                                }`}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                                <span className="ml-2">
                                  {{
                                    asc: <ChevronUp className="size-4" />, // Сортировка по возрастанию
                                    desc: <ChevronDown className="size-4" />, // Сортировка по убыванию
                                  }[header.column.getIsSorted()] ?? (
                                    <ChevronsUpDown className="size-4" />
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <>
              {table.getRowModel().rows.length > 0 && (
                <TableBody>
                  {table.getRowModel().rows.map((row) => {
                    const isEditing = currentOrder?.id === row.original.id
                    return (
                      <>
                        <TableRow
                          key={row.id}
                          className={`relative ${isEditing ? 'z-10 transition-all' : ''}`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <>
                              <TableCell
                                className={`font-normal text-${textColor} text-sm `}
                                key={cell.id}
                                data-label={cell.column.id}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            </>
                          ))}
                          {isEditing && (
                            <div className="rounded-3xl text-base absolute z-10 inset-0 flex items-center h-[62px] justify-center bg-[#265EB6]/90 text-[var(--text)] font-semibold ">
                              На редактирований
                            </div>
                          )}
                        </TableRow>
                      </>
                    )
                  })}
                </TableBody>
              )}
            </>
          </Table>
          {table.getPageCount() > 1 && (
            <Pagination table={table} pagination={pagination} />
          )}

          {isDataEmpty && (
            <div className="flex justify-center items-center h-full py-10">
              <div>{`Данные отсутствуют, создайте запись!`}</div>
            </div>
          )}
          {/* Если фильтрация вернула пустой результат */}
          {isFilteredEmpty && !isDataEmpty && (
            <div className="flex justify-center items-center h-full py-10">
              <div>По данному фильтру ничего не найдено!</div>
            </div>
          )}
          {!isDataEmpty && (
            <InfoCartSentPublisher
              totalOnlineView={totalOnlineView}
              onceOrder={onceOrder}
            />
          )}
        </div>
      </div>
    </div>
  )
}
