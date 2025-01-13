import React from 'react'
import InfoCartButton from './components/InfoCartButton.jsx'
import TablePagination from "@/components/module/TablePagination/index.jsx";
import Pagination from "@/components/module/Pagination/index.jsx";
import {Dialog} from "@/components/ui/dialog.jsx";
import Verify from "@/components/Dashboard/Order/OpenOrder/AddInventory/modal/Verify/Verify.jsx";

export default function AddInventory({
  getOrder,
  expandedRows,
  fetchGetOrder,
  onceOrder,
  table,
  flexRender,
  pagination,
  open,
  setOpen,
  handleClose,
  selectedInventoryId
}) {



  const [totalOnlineView, setTotalOnlineView] = React.useState(0)
  React.useEffect(() => {
    const total = getOrder.reduce(
      (acc, advert) => acc + (advert?.online_views || 0),
      0,
    )
    setTotalOnlineView(total)
  }, [getOrder])

  const filteredVideoLink = onceOrder?.inventories?.find(
    (item) => item.id === selectedInventoryId,
  )
  return (

    <>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          {' '}
          {open && (
            <Verify
              onInventoryVerify
              expandedRows={expandedRows}
              selectedInventoryId={selectedInventoryId}
              videoLink={filteredVideoLink}
              onClose={handleClose}
              onceOrder={onceOrder}
              fetchGetOrder={fetchGetOrder}
            />
          )}
        </Dialog>
      )}
      <div
        className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
        <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
          <TablePagination table={table} flexRender={flexRender} text='создайте размещение'/>
        </div>
        {
          table.getPageCount() > 1 &&
          <Pagination table={table} pagination={pagination}/>}
      </div>
            <InfoCartButton
              totalOnlineView={totalOnlineView}
              onceOrder={onceOrder}
            />
    </>
  )
}
