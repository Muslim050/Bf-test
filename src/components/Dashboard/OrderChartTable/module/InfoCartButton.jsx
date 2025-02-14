import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import FormatterBudjet, {TiinFormatterBudget} from '@/components/Labrery/formatter/FormatterBudjet.jsx'
import React from 'react'

const InfoCartButton = ({ orderData, totalBudget, totalViews }) => {
  return (
    <div className="flex  justify-center h-[80px]">
      <div
        style={{ background: 'var(--bg-color)' }}
        className=" rounded-[25px] mt-4 w-max flex p-[5px] pl-4"
      >
        <div className="flex gap-2">
          <div
            className="text-white sm:text-base text-xs flex gap-2 items-center"
            style={{ marginRight: '5px' }}
          >
            <div className="w-4 h-9 bg-[#D1C5FF] rounded hidden sm:block"></div>
            Итоги
          </div>

          {/*Остаток*/}
          {orderData.status === 'finished' ? (
            <div
              className="sm:flex block gap-3 bg-white bg-opacity-30 backdrop-blur-md text-white p-2.5 rounded-[22px] items-center	 justify-center text-center">
              <div className="sm:text-base text-xs"> Остаток</div>
              <div className="sm:text-base text-xs">

                <FormatterView
                  data="0"
                />
              </div>
            </div>
          ) : (
            <div
              className="sm:flex block gap-3 bg-white bg-opacity-30 backdrop-blur-md text-white p-2.5 rounded-[22px] items-center	 justify-center text-center">
              <div className="sm:text-base text-xs"> Остаток</div>
              <div className="sm:text-base text-xs">

                <FormatterView
                  data={
                    orderData.expected_number_of_views - orderData.online_views
                  }
                />
              </div>
            </div>
          )}
          {/*Остаток*/}

          {/*Статус*/}
          {orderData === 'finished' ? (
            ''
          ) : (
            <div className="sm:flex block items-center ">
              <AdvertStatus
                status={orderData.status}
                endDate={orderData.actual_end_date}
                className="h-full rounded-[22px] sm:flex block"
              >
                {orderData.status === 'in_progress' ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',

                      padding: '3px 5px',
                      borderRadius: '7px',
                      background: (() => {
                        const ratie = Math.floor(
                          (orderData.online_views /
                            orderData.expected_number_of_views) *
                            100,
                        )

                        if (ratie >= 100) {
                          return '#ec2020'
                        } else if (ratie >= 80) {
                          return 'rgba(85, 112, 241, 0.16)'
                        } else if (ratie >= 50) {
                          return 'rgba(50, 147, 111, 0.16)'
                        } else if (ratie >= 1) {
                          return 'rgb(86 112 241)'
                        }
                        return 'inherit'
                      })(),

                      color: (() => {
                        const ratio = Math.floor(
                          (orderData.online_views /
                            orderData.expected_number_of_views) *
                            100,
                        )
                        if (ratio >= 100) {
                          return '#f8f8f8'
                        } else if (ratio >= 80) {
                          return '#5570F1'
                        } else if (ratio >= 50) {
                          return '#519C66'
                        } else if (ratio >= 1) {
                          return 'rgb(228 232 253)'
                        }
                        return 'inherit'
                      })(),
                    }}
                  >
                    {orderData.online_views > 0 &&
                      Math.floor(
                        (orderData.online_views /
                          orderData.expected_number_of_views) *
                          100,
                      ) +
                        ' ' +
                        '%'}
                  </div>
                ) :
                null}
              </AdvertStatus>
            </div>
          )}
          {/*Статус*/}

          {/*Итого показы*/}
          {orderData === 'finished' ? (
            ''
          ) : (
            <div className="bg-white bg-opacity-30 backdrop-blur-md text-white p-2.5 rounded-[22px] items-center	sm:flex block gap-3 justify-center text-center">
              <div className="sm:text-base text-xs">Показы</div>

              <div className="sm:text-base text-xs">
                <FormatterView data={totalViews} />
              </div>
            </div>
          )}
          {/*Итого показы*/}

          {/*Итого показы*/}
          {orderData === 'finished' ? (
            ''
          ) : (
            <div className="bg-white bg-opacity-30 backdrop-blur-md text-white p-2.5 rounded-[22px] items-center		sm:flex block gap-3 justify-center text-center">
              <div className="sm:text-base text-xs">Бюджет</div>

              <div className="sm:text-base text-xs">
                <TiinFormatterBudget
                  budget={totalBudget}
                  // data={orderData.expected_start_date}
                />
              </div>
            </div>
          )}
          {/*Итого показы*/}
        </div>
      </div>
    </div>
  )
}

export default InfoCartButton
