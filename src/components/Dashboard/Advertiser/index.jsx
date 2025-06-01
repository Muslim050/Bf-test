import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdvertiserTable from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/index.jsx'
import AdvertiserTableUsers from '@/components/Dashboard/Advertiser/AdvertiserUsers/index.jsx'
import React from 'react'
import { hasRole } from '../../../utils/roleUtils'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { PackagePlus, UserPlus } from 'lucide-react'
import AdvertiserModalUsers from './AdvertiserUsers/AdvertiserModalUsers'
import Cookies from 'js-cookie'
import AdvertiserModal from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/modal/AdvertiserModal/index.jsx'
import { useAdvertiserUtilizer } from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/useAdvertiserUtilizer.jsx'
import EditAdvModal from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/modal/EditAdvModal.jsx'
import TableSearchInput from '@/shared/TableSearchInput/index.jsx'
import { useAdvertiserUser } from '@/components/Dashboard/Advertiser/AdvertiserUsers/useAdvertiserUser.jsx'

const AdvertiserAndUsers = () => {
  const [selectedTab, setSelectedTab] = React.useState('advertiser')
  const user = Cookies.get('role')

  // Модальное окно Index
  const [openUtilizer, setOpenUtilizer] = React.useState(false)
  const handleClose = () => {
    setOpenUtilizer(false)
  }
  // Модальное окно Index

  // Модальное окно Index
  const [openUsers, setOpenUsers] = React.useState(false)
  const handleCloseUsers = () => {
    setOpenUsers(false)
  }
  // Модальное окно Index

  const {
    table, // Экземпляр таблицы
    globalFilter,
    setGlobalFilter,
    flexRender,
    currentAdv,
    fetchCpm,
    open,
    setOpen,
    pagination,
  } = useAdvertiserUtilizer()

  const {
    table: advertiserUsersTable,
    globalFilter: usersGlobalFilter,
    setGlobalFilter: setUsersGlobalFilter,
    flexRender: flexRenderUsers,
    setLoading,
    pagination: paginationUser,
    loading,
  } = useAdvertiserUser()

  return (
    <div className="mb-4 mt-2">
      <Tabs defaultValue="advertiser">
        <div className="flex justify-between items-center flex-wrap gap-2">
          {user === 'admin' && (
            <TabsList
              className="grid grid-cols-2 w-[300px] h-auto rounded-[14px] mt-2 border_container"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
              }}
            >
              <TabsTrigger
                onClick={() => setSelectedTab('advertiser')}
                value="advertiser"
                className={`text-[12px] relative h-[25px] rounded-[12px] data-[state=active]:bg-brandPrimary-1`}
              >
                Рекламодатели
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setSelectedTab('advertiser-users')}
                value="advertiser-users"
                className={`text-[12px] relative h-[25px] rounded-[12px] data-[state=active]:bg-brandPrimary-1`}
              >
                Пользователи
              </TabsTrigger>
            </TabsList>
          )}
          {selectedTab === 'advertiser' && (
            <div>
              {hasRole('admin') && (
                <div className="flex justify-end ">
                  <div className="flex flex-wrap gap-2">
                    <div>
                      <TableSearchInput
                        value={globalFilter ?? ''}
                        onChange={(value) => setGlobalFilter(String(value))}
                        className={`p-2 font-lg shadow border border-block `}
                      />
                    </div>

                    <Dialog open={openUtilizer} onOpenChange={setOpenUtilizer}>
                      <DialogTrigger asChild>
                        <Button variant="default">
                          <div className="flex items-center justify-center gap-2 ">
                            <PackagePlus />
                            Создать
                          </div>
                        </Button>
                      </DialogTrigger>
                      {openUtilizer && (
                        <AdvertiserModal onClose={handleClose} />
                      )}
                    </Dialog>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'advertiser-users' && (
            <div>
              {hasRole('admin') && (
                <div className="flex justify-end ">
                  <div className="flex flex-wrap gap-2">
                    <div>
                      <TableSearchInput
                        value={usersGlobalFilter ?? ''}
                        onChange={(value) =>
                          setUsersGlobalFilter(String(value))
                        }
                        className={`p-2 font-lg shadow border border-block `}
                      />
                    </div>
                    <Dialog open={openUsers} onOpenChange={setOpenUsers}>
                      <DialogTrigger asChild>
                        <Button variant="default">
                          <div className="flex items-center justify-center gap-2 ">
                            <UserPlus />
                            Создать
                          </div>
                        </Button>
                      </DialogTrigger>
                      {openUsers && (
                        <AdvertiserModalUsers onClose={handleCloseUsers} />
                      )}
                    </Dialog>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <TabsContent value="advertiser">
          <AdvertiserTable
            flexRender={flexRender}
            table={table}
            pagination={pagination}
          />
        </TabsContent>
        <TabsContent value="advertiser-users">
          <AdvertiserTableUsers
            flexRender={flexRenderUsers}
            table={advertiserUsersTable}
            loading={loading}
            setLoading={setLoading}
            pagination={paginationUser}
          />
        </TabsContent>
      </Tabs>

      {/*Редактирование*/}
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        {open && (
          <EditAdvModal
            closeDialog={() => setOpen(false)} // Передаём функцию напрямую
            currentAdvertiser={currentAdv}
            fetchCpm={fetchCpm}
          />
        )}
      </Dialog>
      {/*Редактирование*/}
    </div>
  )
}

export default AdvertiserAndUsers
