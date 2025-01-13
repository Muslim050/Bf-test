import React from 'react'
import style from './InfoCards.module.scss'
import { useParams } from 'react-router-dom'
import FormatterView from '@/components/Labrery/formatter/FormatterView'
import FormatterBudjet from '@/components/Labrery/formatter/FormatterBudjet'
import Cookies from 'js-cookie'

export function InfoCardsTop({ orderData }) {
  const { id } = useParams()
  const user = Cookies.get('role')

  let adasdas = 0
  adasdas += orderData.budget

  return (
    <div className="flex ">
      <div className="sm:text-base text-xs text-center  gap-3	text-white items-center sm:flex block rounded-[20px]	bg-[#b5e4ca80] sm:px-6 px-3 sm:h-[50px] h-[35px]	">
        Номер Заказа
        <div className="sm:text-base text-xs text-white">{id}</div>
      </div>
      <div className="sm:text-base text-xs gap-3	text-white sm:flex block rounded-[20px] text-center	 items-center sm:px-6 px-3	sm:h-[50px] h-[35px]">
        План
        <div className="sm:text-base text-xs text-white">
          {orderData.status === 'in_progress' ? (
            <div className={style.infoCart__text}>
              <FormatterView data={orderData.expected_number_of_views} />
            </div>
          ) : (
            <div className={style.infoCart__text}>
              <FormatterView data={orderData.online_views} />
            </div>
          )}
        </div>
      </div>

      <div className="sm:text-base text-xs gap-3	text-white sm:flex block text-center rounded-[20px]	bg-[#2a85ff75] items-center sm:px-6 px-3	sm:h-[50px] h-[35px]">
        Бюджет
        <div className="sm:text-base text-xs text-white ">
          <FormatterBudjet
            budget={orderData.budget}
            data={orderData.expected_start_date}
          />
        </div>
      </div>
    </div>
  )
}

export function InfoCardsBottom({
  totalViews,
  totalBudget,
  totalAnalitickView,
  orderData,
  totalData,
}) {
  const LorealBudjet = totalData.find((item) => item.budget === 11899087.5)
  return (
    <tr align="center">
      <th></th>
      <th></th>
      <th></th>

      {/*<th*/}
      {/*  className={style.infoCards_bottom_th}*/}
      {/*  rowspan="1"*/}
      {/*  style={{ fontWeight: '400' }}*/}
      {/*>*/}
      {/*  <div style={{ display: 'flex', justifyContent: 'center' }}>Итого:</div>*/}
      {/*</th>*/}
      {/*<th*/}
      {/*  className={style.infoCards_bottom_th}*/}
      {/*  rowspan="1"*/}
      {/*  style={{*/}
      {/*    borderLeft: '4px solid white',*/}
      {/*    width: '130px',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <div className={style.infoCards_bottom_th__toptext}>*/}
      {/*    Остаток*/}
      {/*    <div className={style.infoCards_bottom_th__bottomtext}>*/}
      {/*      {orderData.status === 'in_progress' ? (*/}
      {/*        <FormatterView*/}
      {/*          data={getOrder.expected_number_of_views - getOrder.online_views}*/}
      {/*        />*/}
      {/*      ) : (*/}
      {/*        <FormatterView*/}
      {/*          data={getOrder.expected_number_of_views - totalViews}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</th>*/}

      {/*<th*/}
      {/*  className={style.infoCards_bottom_th}*/}
      {/*  rowspan="2"*/}
      {/*  style={{*/}
      {/*    borderLeft: '4px solid white',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <div*/}
      {/*    className={style.infoCards_bottom_th__toptext}*/}
      {/*    style={{*/}
      {/*      display: 'flex',*/}
      {/*      justifyContent: 'space-between',*/}
      {/*      flexDirection: 'column',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Прогресс{' '}*/}
      {/*    {getOrder.status === 'in_progress' ? (*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          display: 'flex',*/}
      {/*          justifyContent: 'space-around',*/}
      {/*          marginTop: '5px',*/}
      {/*          padding: '3px 5px',*/}
      {/*          borderRadius: '7px',*/}
      {/*          background: (() => {*/}
      {/*            const ratie = Math.floor(*/}
      {/*              (getOrder.online_views /*/}
      {/*                getOrder.expected_number_of_views) **/}
      {/*                100,*/}
      {/*            )*/}

      {/*            if (ratie >= 100) {*/}
      {/*              return '#ec2020'*/}
      {/*            } else if (ratie >= 80) {*/}
      {/*              return 'rgba(85, 112, 241, 0.16)'*/}
      {/*            } else if (ratie >= 50) {*/}
      {/*              return 'rgba(50, 147, 111, 0.16)'*/}
      {/*            } else if (ratie >= 1) {*/}
      {/*              return 'rgb(86 112 241)'*/}
      {/*            }*/}
      {/*            return 'inherit'*/}
      {/*          })(),*/}

      {/*          color: (() => {*/}
      {/*            const ratio = Math.floor(*/}
      {/*              (getOrder.online_views /*/}
      {/*                getOrder.expected_number_of_views) **/}
      {/*                100,*/}
      {/*            )*/}
      {/*            if (ratio >= 100) {*/}
      {/*              return '#f8f8f8'*/}
      {/*            } else if (ratio >= 80) {*/}
      {/*              return '#5570F1'*/}
      {/*            } else if (ratio >= 50) {*/}
      {/*              return '#519C66'*/}
      {/*            } else if (ratio >= 1) {*/}
      {/*              return 'rgb(228 232 253)'*/}
      {/*            }*/}
      {/*            return 'inherit'*/}
      {/*          })(),*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        {getOrder.online_views > 0 &&*/}
      {/*          Math.floor(*/}
      {/*            (getOrder.online_views / getOrder.expected_number_of_views) **/}
      {/*              100,*/}
      {/*          ) +*/}
      {/*            ' ' +*/}
      {/*            '%'}*/}
      {/*      </div>*/}
      {/*    ) : (*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          display: 'flex',*/}
      {/*          justifyContent: 'space-around',*/}
      {/*          marginTop: '5px',*/}
      {/*          padding: '3px 5px',*/}
      {/*          borderRadius: '7px',*/}
      {/*          background: (() => {*/}
      {/*            const ratie = Math.floor(*/}
      {/*              (totalViews / getOrder.online_views) * 100,*/}
      {/*            )*/}

      {/*            if (ratie >= 100) {*/}
      {/*              return '#ec2020'*/}
      {/*            } else if (ratie >= 80) {*/}
      {/*              return 'rgba(85, 112, 241, 0.16)'*/}
      {/*            } else if (ratie >= 50) {*/}
      {/*              return 'rgba(50, 147, 111, 0.16)'*/}
      {/*            } else if (ratie >= 1) {*/}
      {/*              return 'rgb(86 112 241)'*/}
      {/*            }*/}
      {/*            return 'inherit'*/}
      {/*          })(),*/}

      {/*          color: (() => {*/}
      {/*            const ratio = Math.floor(*/}
      {/*              (totalViews / getOrder.online_views) * 100,*/}
      {/*            )*/}
      {/*            if (ratio >= 100) {*/}
      {/*              return '#f8f8f8'*/}
      {/*            } else if (ratio >= 80) {*/}
      {/*              return '#5570F1'*/}
      {/*            } else if (ratio >= 50) {*/}
      {/*              return '#519C66'*/}
      {/*            } else if (ratio >= 1) {*/}
      {/*              return 'rgb(228 232 253)'*/}
      {/*            }*/}
      {/*            return 'inherit'*/}
      {/*          })(),*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        {totalViews > 0 &&*/}
      {/*          Math.floor((totalViews / getOrder.online_views) * 100) +*/}
      {/*            ' ' +*/}
      {/*            '%'}*/}
      {/*      </div>*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</th>*/}
      <th
        className={style.infoCards_bottom_th}
        rowSpan="2"
        style={{
          borderLeft: '4px solid white',
        }}
      >
        <div className={style.infoCards_bottom_th__toptext}>
          Показы
          <div className={style.infoCards_bottom_th__bottomtext}>
            {LorealBudjet ? (
              <FormatterView data="349 676" />
            ) : (
              <FormatterView data={totalViews} />
            )}
          </div>
        </div>
      </th>

      <th
        className={style.infoCards_bottom_th}
        rowSpan="2"
        style={{
          borderLeft: '4px solid white',
        }}
      >
        <div className={style.infoCards_bottom_th__toptext}>
          Бюджет
          <div
            className={style.infoCards_bottom_th__bottomtext}
            style={{ display: 'flex' }}
          >
            {totalBudget === 0 ? (
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: '15px',
                  color: '#fa8a00',
                }}
              >
                Введется <br /> аналитика
              </div>
            ) : (
              <>
                {LorealBudjet ? (
                  <FormatterBudjet
                    budget={13112850}
                    // data={getOrder.expected_start_date}
                  />
                ) : (
                  <FormatterBudjet
                    budget={totalBudget}
                    // data={getOrder.expected_start_date}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </th>
    </tr>
  )
}
