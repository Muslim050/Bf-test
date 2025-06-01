import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdvertiserAgencyUtilizer from '@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUtilizer/index.jsx'
import AdvertiserAgencyUsers from '@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUsers/index.jsx'
import React from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { PackagePlus } from 'lucide-react'
import AdvertiserAgencyModalUsers from './AdvertiserAgencyUsers/AdvertiserAgencyModalUsers'
import AdvertiserAgencyModal from './AdvertiserAgencyUtilizer/AdvertiserAgencyModal'
import Cookies from 'js-cookie'
import { useAdvertiserAgencyUtilizer } from '@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUtilizer/useAdvertiserAgencyUtilizer.jsx'
import EditAdvertiserAgencyModal from '@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUtilizer/EditAdvertiserAgencyModal.jsx'
import TableSearchInput from '@/shared/TableSearchInput/index.jsx'
import { useAdvertiserAgencyUser } from '@/components/Dashboard/AdvertiserAgency/AdvertiserAgencyUsers/useAdvertiserAgencyUser.jsx'
import { hasRole } from '@/utils/roleUtils.js'

const AdvertiserAgencyAndUsers = () => {
  const user = Cookies.get('role')
  const [selectedTab, setSelectedTab] = React.useState('advertiser')
  // Модальное окно OrderModal
  const [openUser, setOpenUser] = React.useState(false)
  const handleClose = () => {
    setOpenUser(false)
  }
  // Модальное окно OrderModal

  // Модальное окно OrderModal
  const [openUtilizer, setOpenUtilizer] = React.useState(false)
  const handleCloseUtilizer = () => {
    setOpenUtilizer(false)
  }
  // Модальное окно OrderModal

  const {
    table, // Экземпляр таблицы
    globalFilter,
    setGlobalFilter,
    flexRender,
    currentAdv,
    handleCloseEdit,
    open,
    setOpen,
    pagination,
  } = useAdvertiserAgencyUtilizer()

  const {
    table: advertiserUsersTable,
    globalFilter: usersGlobalFilter,
    setGlobalFilter: setUsersGlobalFilter,
    flexRender: flexRenderUsers,
    pagination: paginationUser,
  } = useAdvertiserAgencyUser()

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
                Рекламное агентство
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
                        <AdvertiserAgencyModal onClose={handleCloseUtilizer} />
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
                    <Dialog open={openUser} onOpenChange={setOpenUser}>
                      <DialogTrigger asChild>
                        <Button variant="default">
                          <div className="flex items-center justify-center gap-2 ">
                            <PackagePlus />
                            Создать
                          </div>
                        </Button>
                      </DialogTrigger>
                      {openUser && (
                        <AdvertiserAgencyModalUsers onClose={handleClose} />
                      )}
                    </Dialog>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <TabsContent value="advertiser">
          <AdvertiserAgencyUtilizer
            flexRender={flexRender}
            table={table}
            pagination={pagination}
          />
        </TabsContent>
        <TabsContent value="advertiser-users">
          <AdvertiserAgencyUsers
            flexRender={flexRenderUsers}
            table={advertiserUsersTable}
            pagination={paginationUser}
          />
        </TabsContent>
      </Tabs>

      {/*Редактирование*/}
      <Dialog open={open} onOpenChange={setOpen}>
        {open && (
          <EditAdvertiserAgencyModal
            onClose={handleCloseEdit}
            currentOrder={currentAdv}
          />
        )}
      </Dialog>
      {/*Редактирование*/}
    </div>
  )
}

export default AdvertiserAgencyAndUsers
