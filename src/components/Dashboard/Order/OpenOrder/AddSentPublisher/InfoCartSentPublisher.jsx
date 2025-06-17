import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from '@/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import Cookies from 'js-cookie'

const InfoCartSentPublisher = ({ totalOnlineView, onceOrder }) => {
  const role = Cookies.get('role')

  return (
    <div className="flex  justify-center ">
      <div
        style={{ background: 'var(--bg-color)' }}
        className=" rounded-[25px] my-2 w-max flex p-[5px]"
      >
        <div className="flex gap-2">
          {/* Итого показы */}
          {onceOrder === 'finished' ? (
            ''
          ) : (
            <div className="sm:flex block gap-3 bg-white bg-opacity-30 backdrop-blur-md text-[var(--text)] p-2.5 rounded-[22px] items-center	 justify-center text-center">
              <div className="sm:text-base text-xs	"> Итого показы:</div>
              <div className="sm:text-base text-xs">
                <FormatterView data={totalOnlineView} />
              </div>
            </div>
          )}
          {/* Итого показы */}

          {/*Остаток*/}
          {onceOrder === 'finished' ? (
            ''
          ) : (
            <div className="sm:flex block gap-3 bg-white bg-opacity-30 backdrop-blur-md text-[var(--text)] p-2.5 rounded-[22px] items-center	 justify-center text-center">
              <div className="sm:text-base text-xs	"> Остаток:</div>
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
                endDate={onceOrder.expected_end_date}
                className="h-full rounded-[22px] sm:flex block"
              >
                {role === 'admin' || role === 'advertising_agency' ? (
                  <>
                    {role === 'admin' || role === 'advertising_agency' ? (
                      <>
                        {onceOrder.status === 'in_progress' ? (
                          <div
                            style={{
                              display: 'flex',

                              padding: '1px 5px',
                              borderRadius: '7px',
                              fontWeight: '600',
                              background: (() => {
                                const ratie = Math.floor(
                                  (onceOrder.online_views /
                                    onceOrder.expected_number_of_views) *
                                    100,
                                )

                                if (ratie >= 100) {
                                  return '#ec2020'
                                } else if (ratie >= 80) {
                                  return '#fd8b00'
                                } else if (ratie >= 50) {
                                  return 'rgba(50, 147, 111, 0.16)'
                                } else if (ratie >= 1) {
                                  return 'rgb(86 112 241)'
                                }
                                return 'inherit'
                              })(),

                              color: (() => {
                                const ratio =
                                  (onceOrder.online_views /
                                    onceOrder.expected_number_of_views) *
                                  100

                                if (ratio >= 100) {
                                  return '#f8f8f8'
                                } else if (ratio >= 80) {
                                  return '#764306'
                                } else if (ratio >= 50) {
                                  return '#047f27'
                                } else if (ratio >= 1) {
                                  return 'rgb(228 232 253)'
                                }
                                return 'inherit'
                              })(),
                            }}
                          >
                            {onceOrder.online_views > 0 &&
                              Math.floor(
                                (onceOrder.online_views /
                                  onceOrder.expected_number_of_views) *
                                  100,
                              ) +
                                ' ' +
                                '%'}
                          </div>
                        ) : null}
                        {onceOrder.status === 'finished' ? (
                          <div
                            style={{
                              display: 'initial',
                              padding: '1px 4px',
                              borderRadius: '7px',
                              background: 'rgb(156 81 81)',
                              color: '#eedede',
                              marginLeft: '10px',
                            }}
                          >
                            100%
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </>
                ) : null}
              </AdvertStatus>
            </div>
          )}
          {/*Статус*/}
        </div>
      </div>
    </div>
  )
}

export default InfoCartSentPublisher
