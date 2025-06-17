import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import Cookies from 'js-cookie'
import { hasRole } from '@/utils/roleUtils.js'
import { getProgressStyle } from '@/components/Dashboard/Order/OrderTable/components/getProgressStyle.jsx'
import React from 'react'

const InfoCartButton = ({ totalOnlineView, onceOrder }) => {
  const role = Cookies.get('role')
  return (
    <div className="flex  justify-center ">
      <div
        className=" rounded-[25px] my-2 w-max flex p-[5px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
        }}
      >
        <div className="flex gap-2">
          {/* Итого показы */}
          {totalOnlineView ? (
            <>
              {onceOrder === 'finished' ? null : (
                <div className="sm:flex block gap-3 bg-white bg-opacity-30 backdrop-blur-md text-[var(--text)] p-2.5 rounded-[22px] items-center	 justify-center text-center">
                  <div className="sm:text-base text-xs">Итого показы</div>
                  <div className="sm:text-base text-xs">
                    <FormatterView data={totalOnlineView} />
                  </div>
                </div>
              )}
            </>
          ) : null}
          {/* Итого показы */}

          {/*Остаток*/}
          {onceOrder === 'finished' ? (
            ''
          ) : (
            <div className="sm:flex block gap-3 bg-white bg-opacity-30 backdrop-blur-md text-[var(--text)] p-2.5 rounded-[22px] items-center	 justify-center text-center">
              <div className="sm:text-base text-xs	"> Остаток</div>
              <div className="sm:text-base text-xs">
                {onceOrder.status === 'finished' ? (
                  <FormatterView data="0" />
                ) : (
                  <FormatterView
                    data={
                      onceOrder.expected_number_of_views -
                      onceOrder.online_views
                    }
                  />
                )}
              </div>
            </div>
          )}
          {/*Остаток*/}

          {/*Статус*/}
          {onceOrder === 'finished' ? (
            ''
          ) : (
            <div className="sm:flex block items-center ">
              <AdvertStatus
                status={onceOrder.status}
                endDate={onceOrder.actual_end_date}
                className="h-full rounded-3xl"
              >
                {hasRole('admin') ||
                hasRole('advertising_agency') ||
                hasRole('advertiser')
                  ? onceOrder.status === 'in_progress' && (
                      <div
                        className="rounded-lg px-1 font-semibold"
                        style={getProgressStyle(
                          onceOrder.online_views,
                          onceOrder.expected_number_of_views,
                        )}
                      >
                        {Math.floor(
                          (onceOrder.online_views /
                            onceOrder.expected_number_of_views) *
                            100,
                        )}
                        %
                      </div>
                    )
                  : null}
              </AdvertStatus>
            </div>
          )}
          {/*Статус*/}
        </div>
      </div>
    </div>
  )
}

export default InfoCartButton
