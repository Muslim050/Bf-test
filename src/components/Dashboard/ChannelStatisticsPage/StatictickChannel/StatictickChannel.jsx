import style from './StatictickChannelTable.module.scss'
import TheadFirst from './components/TheadDataDopTable/Thead/TheadFirst'
import TheadSecondWrapper from './components/TheadDataDopTable/Thead/TheadSecondWrapper'
import DataDopTable from './components/TheadDataDopTable/Data/DataDopTable'
import { Link, useLocation } from 'react-router-dom'
import FormatterView from '@/components/Labrery/formatter/FormatterView'
import { Table, TableRow, TableHeader } from '@/components/ui/table'
import { ChevronLeft } from 'lucide-react'

function StatictickChannel({ dataChannel, channel, error }) {
  const location = useLocation()
  const channelName = location.state?.channel
  console.log (channel)
  return (
    <>
      <Link to={'/channel'} style={{ display: 'inline-flex' }}>
        <ChevronLeft className="w-8 h-6 hover:text-brandPrimary-1" />
      </Link>
      {/*Нужно переподключить канал*/}


      <div className="tableWrapper">
        {channel ? (
          <div className="loaderWrapper" style={{ height: '20vh' }}>
            <div style={{ color: 'var(--text-color, )' }}>
              Загрузка статистики &nbsp;
            </div>
            <div className="spinner"></div>
          </div>
        ) : (
          <>

              <div
                className={`border_container rounded-[22px] p-[12px]  glass-background`}
              >
                <div className="tableWrapper__table_title">
                  <div className={`${error ? 'text-red-500 font-semibold' : 'text-white'} flex items-center gap-2`}>
                    <div className={`${error ? 'bg-red-600 ' : 'bg-green-500'} w-4 h-8 rounded-2xl`}></div>
                    Статистика / {channelName.name}
                  </div>
                </div>

                {error ? (
                  <div
                    style={{
                      fontSize: '16px',
                      padding: "30px 0",
                      lineHeight: '15px',
                      color: '#fa8a00',
                      textAlign: 'center',
                      fontWeight: '600',
                    }}
                  >
                    {
                      error
                    }
                  </div>
                ) : (
                <div
                  className={` bg-[#ffffff3d] w-full  rounded-[22px] mt-4 p-3.5`}
                >



                  <div className="flex items-center gap-7 w-full ">
                    <div className="">
                      <div className="flex gap-7 ">
                        <div className="text-[12px]  	text-white flex  items-center 	">
                          <div className="text-[28px] ">
                            <FormatterView data={dataChannel?.number_of_views} />
                            <div className="text-[12px]">Кол-во просмотров</div>
                          </div>
                        </div>
                        <div className="text-base h-[70px] gap-5	text-white flex rounded-[22px]	bg-[#b5e4ca80] items-center px-6	">
                          <div className="text-[28px] ">
                            <FormatterView data={dataChannel?.number_of_likes} />
                            <div className="text-[12px]">Кол-во лайков</div>
                          </div>{' '}
                          <div className="text-[28px] ">
                            <FormatterView
                              data={dataChannel?.number_of_dislikes}
                            />
                            <div className="text-[12px]">Кол-во дизлайков</div>
                          </div>{' '}
                        </div>
                        <div className="text-[12px]  	text-white flex  items-center 	">
                          <div className="text-[28px] ">
                            <FormatterView
                              data={dataChannel?.number_of_comments}
                            />
                            <div className="text-[12px]">
                              Кол-во комментариев
                            </div>
                          </div>
                        </div>
                        <div className="text-base h-[70px] gap-5	text-white flex rounded-[22px]	bg-[#2a85ff75] items-center px-6	">
                          <div className="text-[28px] ">
                            <FormatterView
                              data={dataChannel?.estimated_minutes_watched}
                            />
                            <div className="text-[12px]">
                              Срендее кол-во минут просмотров
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>





                </div>
                )}
                {
                  dataChannel?.length === 0 ? null :
                <div
                  className={`border_container rounded-[22px] p-[5px] mt-2  glass-background`}
                >
                  {' '}
                  <Table
                      className={`${style.responsive_table} border_design rounded-lg overflow-auto `}
                    >
                      <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
                        {/* верхние столбцы доп таблицы*/}
                        <TableRow>
                          <TheadFirst dataChannel={dataChannel} />
                        </TableRow>
                        {/* верхние столбцы доп таблицы*/}
                      </TableHeader>
                      <TableHeader className="bg-[#FFFFFF2B] !rounded-tl-[20px]">
                        {/* столбцы доп таблицы*/}
                        <TableRow className=" text-center">
                          <TheadSecondWrapper dataChannel={dataChannel} />
                        </TableRow>
                        {/* столбцы доп таблицы*/}
                      </TableHeader>
                      {/* Данные доп таблицы */}
                      <DataDopTable dataChannel={dataChannel} />
                      {/* Данные доп таблицы */}
                    </Table>


                </div>
                }
              </div>
          </>
        )}
      </div>
    </>
  )
}

export default StatictickChannel
