import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideos } from '@/redux/video/videoSlice.js'
import PreLoadDashboard from "@/components/Dashboard/PreLoadDashboard/PreLoad.jsx";
import TableSearchInput from "@/shared/TableSearchInput/index.jsx";
import {useVideo} from "@/components/Dashboard/Video/TableVideo/useVideo.jsx";
import ModalLinkedVideo from "@/components/Dashboard/Video/TableVideo/LinkedVideo.jsx";
import {Dialog} from "@/components/ui/dialog.jsx";
import EditVideoModal from "@/components/Dashboard/Video/TableVideo/EditVideoModal.jsx";
import TablePagination from "@/components/module/TablePagination/index.jsx";
import Pagination from "@/components/module/Pagination/index.jsx";

function TableVideo() {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.video)
  const [loading, setLoading] = React.useState(true)

  const {
    table, // Экземпляр таблицы
    globalFilter,
    setGlobalFilter,
    flexRender,
    setOpen,
    open,
    handleClose,selectedId,
    edit,
    setEdit,
    handleCloseEdit,
    currentOrder,
    pagination

  } = useVideo();


  React.useEffect(() => {
    dispatch(fetchVideos({
      page: pagination.pageIndex + 1, // API использует нумерацию с 1
      pageSize: pagination.pageSize,
    }))
      .then(() => setLoading(false))
  }, [dispatch, pagination.pageIndex, pagination.pageSize])

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {open && (
          <ModalLinkedVideo onClose={handleClose} selectedId={selectedId} />
        )}
      </Dialog>

      <Dialog open={edit} onOpenChange={setEdit}>
        {edit && (
          <EditVideoModal
            onClose={handleCloseEdit}
            currentOrder={currentOrder}
          />
        )}
      </Dialog>
      <div className='flex justify-end mt-3'>
        <TableSearchInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter (String (value))}
          className={`p-2 font-lg shadow border border-block `}
        />
      </div>

      {status === 'loading' ? (
        <PreLoadDashboard onComplete={() => setLoading (false)} loading={loading} text={'Загрузка видео'}/>
      ) : (
        <>
          <div
            className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
            <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
              <TablePagination table={table} flexRender={flexRender} text='создайте видео'/>
            </div>
          </div>
          <Pagination table={table} pagination={pagination}/>
        </>
      )}
    </>
  )
}

export default TableVideo
