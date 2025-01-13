import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PublihserUtilizer from '@/components/Dashboard/Publisher/PublihserUtilizer/index.jsx'
import React from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Plus } from 'lucide-react'
import PublisherModal from '@/components/Dashboard/Publisher/PublihserUtilizer/PublisherModal.jsx'
import Cookies from 'js-cookie'
import {usePublihserUtilizer} from "@/components/Dashboard/Publisher/PublihserUtilizer/usePublihserUtilizer.jsx";
import TableSearchInput from "@/shared/TableSearchInput/index.jsx";
import {usePublihserUser} from "@/components/Dashboard/Publisher/PublisherUsers/usePublisherUser.jsx";
import PublisherTableUsers from "@/components/Dashboard/Publisher/PublisherUsers/index.jsx";
import PublisherModalUsers from "@/components/Dashboard/Publisher/PublisherUsers/PublisherModalUsers.jsx";


const PublisherAndUsers = () => {
  const [selectedTab, setSelectedTab] = React.useState('pablisher')
  const user = Cookies.get('role')

  // Модальное окно ModalUtilizer
  const [modalUtilizer, setModalUtilizer] = React.useState(false)
  const handleCloseModalUtilizer = () => {
    setModalUtilizer(false)
  }
  // Модальное окно ModalUtilizer

  // Модальное окно ModalUser
  const [modalUser, setModalUser] = React.useState(false)
  const handleCloseModalUser = () => {
    setModalUser(false)
  }
  // Модальное окно ModalUser



  const {
    table, // Экземпляр таблицы
    globalFilter,
    setGlobalFilter,
    flexRender,
    pagination
  } = usePublihserUtilizer();

  const {
    table: publisherUsersTable,
    globalFilter: usersGlobalFilter,
    setGlobalFilter: setUsersGlobalFilter,
    flexRender: flexRenderUsers,
    pagination: paginationUsers
  } = usePublihserUser();



  return (
    <div className="mb-4 mt-2">
      <Tabs defaultValue="pablisher">
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
                onClick={() => setSelectedTab('pablisher')}
                value="pablisher"
                className="data-[state=active]:bg-brandPrimary-1 text-[12px] relative h-[25px] rounded-[12px]"
              >
                Паблишеры
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setSelectedTab('pablisher-users')}
                value="pablisher-users"
                className=" data-[state=active]:bg-brandPrimary-1 text-[12px] relative h-[25px] rounded-[12px]"
              >
                Пользователи
              </TabsTrigger>
            </TabsList>
          )}

          {selectedTab === 'pablisher' && (
            <div className="flex justify-end ">
              {user === 'publisher' ? (
                ''
              ) : (
                <div className="flex justify-end ">

                <div className='flex flex-wrap gap-2'>
                  <div>
                    <TableSearchInput
                      value={globalFilter ?? ''}
                      onChange={value => setGlobalFilter (String (value))}
                      className={`p-2 font-lg shadow border border-block `}
                    />
                  </div>
                <Dialog open={modalUtilizer} onOpenChange={setModalUtilizer}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className=" bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                    >
                      <Plus className="w-5 h-5 mr-2" /> Создать паблишера
                    </Button>
                  </DialogTrigger>
                  {modalUtilizer && (
                    <PublisherModal onClose={handleCloseModalUtilizer} />
                  )}
                </Dialog>
                </div>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'pablisher-users' && (
            <div className="flex justify-end ">
              <div className='flex flex-wrap gap-2'>
                <div>
                  <TableSearchInput
                    value={usersGlobalFilter ?? ''}
                    onChange={value => setUsersGlobalFilter (String (value))}
                    className={`p-2 font-lg shadow border border-block `}
                  />
                </div>
              <Dialog open={modalUser} onOpenChange={setModalUser}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    // onClick={handleButtonClick}
                    className=" bg-brandPrimary-1 rounded-[22px] hover:bg-brandPrimary-50 text-white no-underline hover:text-white "
                  >
                    <Plus className="w-5 h-5 mr-2" /> Создать пользователя
                  </Button>
                </DialogTrigger>
                {modalUser && (
                  <PublisherModalUsers onClose={handleCloseModalUser} />
                )}
              </Dialog>
              </div>
            </div>
          )}
        </div>

        <TabsContent value="pablisher">
          <PublihserUtilizer table={table} flexRender={flexRender} pagination={pagination}/>
        </TabsContent>
        <TabsContent value="pablisher-users">
          <PublisherTableUsers flexRender={flexRenderUsers}
                 table={publisherUsersTable}
                 pagination={paginationUsers}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PublisherAndUsers
