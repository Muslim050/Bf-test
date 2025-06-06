import style from './StatictickChannelTable.module.scss'
import TheadFirst from './components/TheadDataDopTable/Thead/TheadFirst'
import TheadSecondWrapper from './components/TheadDataDopTable/Thead/TheadSecondWrapper'
import DataDopTable from './components/TheadDataDopTable/Data/DataDopTable'
import { Link, useLocation } from 'react-router-dom'
import FormatterView from '@/components/Labrery/formatter/FormatterView'
import { Table, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronLeft } from 'lucide-react'

function StatictickChannel({ dataChannel, channel, error }) {
  const location = useLocation()
  const pathSegments = location.pathname.split('/') // Разбиваем URL на части
  const channelName = decodeURIComponent(pathSegments[3]) // 3-й элемент массива — это name
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
                <div
                  className={`${error ? 'text-red-500 font-semibold' : 'text-white'} flex items-center gap-2`}
                >
                  <div
                    className={`${error ? 'bg-red-600 ' : 'bg-green-500'} w-4 h-8 rounded-2xl`}
                  ></div>
                  Статистика / {channelName}
                </div>
              </div>

              {error ? (
                <div
                  style={{
                    fontSize: '16px',
                    padding: '30px 0',
                    lineHeight: '15px',
                    color: '#fa8a00',
                    textAlign: 'center',
                    fontWeight: '600',
                  }}
                >
                  {error}
                </div>
              ) : (
                <div
                  className={` bg-[#ffffff3d] w-full  rounded-[22px] mt-4 p-3.5`}
                >
                  <div className="flex-wrap xl:flex-nowrap flex items-center justify-between gap-7 w-full ">
                    <div className="">
                      <div className="flex xl:flex-nowrap flex-wrap gap-3 ">
                        {/*////*/}
                        <div className="text-base h-[70px] gap-5	text-white flex rounded-[22px]	border border-white items-center px-4	">
                          <div className="xl:text-[28px] text-[18px]">
                            <FormatterView
                              data={dataChannel?.number_of_views}
                            />

                            <div className="lg:text-[12px] text-[10px]">
                              Кол-во просмотров
                            </div>
                          </div>
                        </div>
                        {/*////*/}
                        <div className="text-base h-[70px] gap-5	text-white flex rounded-[22px]	bg-[#b5e4ca80] items-center px-4	">
                          <div className="xl:text-[28px] text-[18px]">
                            <FormatterView
                              data={dataChannel?.number_of_likes}
                            />
                            <div className="lg:text-[12px] text-[10px]">
                              Кол-во лайков
                            </div>
                          </div>
                        </div>
                        {/*////*/}
                        <div className="text-base h-[70px] gap-5	text-white flex rounded-[22px]	bg-[#b5e4ca80] items-center px-4	">
                          <div className="xl:text-[28px] text-[18px]">
                            <FormatterView
                              data={dataChannel?.number_of_dislikes}
                            />
                            <div className="lg:text-[12px] text-[10px]">
                              Кол-во дизлайков
                            </div>
                          </div>
                        </div>
                        {/*////*/}

                        <div className="text-base h-[70px] gap-5	text-white flex rounded-[22px]	border border-white items-center px-4	">
                          <div className="xl:text-[28px] text-[18px]">
                            <FormatterView
                              data={dataChannel?.number_of_comments}
                            />
                            <div className="lg:text-[12px] text-[10px]">
                              Кол-во комментариев
                            </div>
                          </div>
                        </div>

                        <div className="text-base h-[70px] gap-5	text-white flex rounded-[22px]	bg-[#2a85ff75] items-center px-4	">
                          <div className="xl:text-[28px] text-[18px]">
                            <FormatterView
                              data={dataChannel?.estimated_minutes_watched}
                            />
                            <div className="lg:text-[12px] text-[10px]">
                              Срендее кол-во минут просмотров
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 items-center text-lg	 font-semibold">
                      You{' '}
                      <span className="bg-red-600 px-1 py-1 rounded-xl">
                        Tube
                      </span>
                      <p className="text-lg	 font-medium">Analytics</p>
                    </div>
                  </div>
                </div>
              )}
              {dataChannel?.length === 0 ? null : (
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
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default StatictickChannel
