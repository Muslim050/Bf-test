import React from 'react'
import FormatterView from '@/components/Labrery/formatter/FormatterView'
import FormatterBudjet from '@/components/Labrery/formatter/FormatterBudjet'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

export function InfoCardsBottom({ totalViews, totalBudget }) {
  const ndc = totalBudget * 0.12
  const { textColor } = React.useContext(ThemeContext)

  return (
    <div className="w-full justify-center flex py-4">
    <div className="flex rounded-[25px]	 bg-[#FFFFFF2B] max-w-max	 h-[80px] px-4 py-[4px] gap-2">
      <div className="flex items-center gap-2">
        <div className="w-2.5	h-6	bg-[#D1C5FF] rounded-[4px]"></div>
        <h4 className="font-medium " style={{ color: textColor }}>
          Итого
        </h4>
      </div>
      <div className=" gap-2  flex flex-col justify-center text-base h-full  bg-[#FFFFFF1A]	text-white  rounded-[22px]	  items-normal  px-4	">
        <div
          className="flex items-center justify-between gap-4"
          style={{ color: textColor }}
        >
          <div className="text-base	">Показы</div>
          <FormatterView data={totalViews} />
        </div>
      </div>

      <div className=" gap-2  flex flex-col justify-center text-base h-full  	text-white  	  items-normal  px-4	">
        <div className="flex gap-4 items-center justify-between">
          <div className="text-base font-medium	" style={{ color: textColor }}>
            Бюджет
          </div>
          <div style={{ color: textColor }}>
            <FormatterBudjet
              budget={totalBudget}
              // data={getOrder.expected_start_date}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-base	" style={{ color: textColor }}>
            НДС
          </div>
          <div className="">
            {ndc > 0 ? (
              <div className="text-base " style={{ color: textColor }}>
                <FormatterBudjet budget={ndc} className="text-base" />
              </div>
            ) : (
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: '15px',
                  color: '#fa8a00',
                }}
              >
                ---
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>=</div>

        <div className="text-base " style={{ color: textColor }}>
          <FormatterBudjet
            budget={totalBudget + ndc}
            // data={getOrder.expected_start_date}
          />{' '}
          <div className="text-base " style={{ color: textColor }}>
            Итого с НДС
          </div>
        </div>
      </div>
    </div>
    </div>
      )
}
