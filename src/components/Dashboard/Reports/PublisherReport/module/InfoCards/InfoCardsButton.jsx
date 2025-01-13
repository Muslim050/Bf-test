import React from 'react'
import FormatterBudjet from '@/components/Labrery/formatter/FormatterBudjet.jsx'

export function InfoCardsButton({ totalComisyAdtech }) {
  const ndc = totalComisyAdtech * 0.12
  return (
    <>
      <div className="flex rounded-[25px]	 bg-[#FFFFFF2B] max-w-max	 h-[80px] px-4 py-[4px] gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5	h-6	bg-[#D1C5FF] rounded-[4px]"></div>
          <h4 className="font-medium text-white">Итого</h4>
        </div>

        <div className=" gap-2 w-[250px] flex flex-col justify-center text-base h-full  bg-[#FFFFFF1A]	text-white  rounded-[22px]	  items-normal  px-6	">
          <div className="flex items-center justify-between">
            <div className="text-base 	">Бюджет</div>
            <div className="t">
              {totalComisyAdtech > 0 ? (
                <div className="text-[16px] text-white">
                  <FormatterBudjet budget={totalComisyAdtech} />
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

          <div className="flex items-center justify-between">
            <div className="text-base	">НДС</div>
            <div className="">
              {ndc > 0 ? (
                <div className="text-base text-white">
                  <FormatterBudjet budget={ndc} />
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

          {totalComisyAdtech > 0 ? (
            <div className="text-base text-white">
              <FormatterBudjet budget={totalComisyAdtech + ndc} />
              <div className="text-base 	">Итого с НДС</div>
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
    </>
  )
}
