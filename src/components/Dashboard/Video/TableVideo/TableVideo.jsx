import PreLoadDashboard from '@/components/Dashboard/PreLoadDashboard/PreLoad.jsx'
import TableSearchInput from '@/shared/TableSearchInput/index.jsx'
import { useVideo } from '@/components/Dashboard/Video/TableVideo/useVideo.jsx'
import ModalLinkedVideo from '@/components/Dashboard/Video/TableVideo/LinkedVideo.jsx'
import { Dialog } from '@/components/ui/dialog.jsx'
import EditVideoModal from '@/components/Dashboard/Video/TableVideo/EditVideoModal.jsx'
import TablePagination from '@/module/TablePagination/index.jsx'
import Pagination from '@/module/Pagination/index.jsx'

function TableVideo() {
  const {
    table, // Экземпляр таблицы
    globalFilter,
    setGlobalFilter,
    flexRender,
    setOpen,
    open,
    handleClose,
    selectedId,
    edit,
    setEdit,
    handleCloseEdit,
    currentOrder,
    pagination,
    loading,
    setLoading,
  } = useVideo()

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
      <div className="flex justify-end mt-3">
        <TableSearchInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className={`p-2 font-lg shadow border border-block `}
        />
      </div>

      {loading ? (
        <PreLoadDashboard
          onComplete={() => setLoading(false)}
          loading={loading}
          text={'Загрузка видео'}
        />
      ) : (
        <>
          <div className="border_container rounded-[22px] mt-3 p-[3px] glass-background flex flex-col h-full max-h-screen">
            <div className="overflow-y-auto sm:max-h-[calc(100vh-200px)] max-h-[calc(100vh-250px)] flex-1">
              <TablePagination
                table={table}
                flexRender={flexRender}
                text="создайте видео"
              />
            </div>
          </div>
          <Pagination table={table} pagination={pagination} />
        </>
      )}
    </>
  )
}

export default TableVideo
