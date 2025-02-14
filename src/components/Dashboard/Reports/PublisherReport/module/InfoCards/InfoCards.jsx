import FormatterView from '@/components/Labrery/formatter/FormatterView'
import FormatterBudjet, {TiinFormatterBudget} from '@/components/Labrery/formatter/FormatterBudjet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { truncate } from '@/utils/other.js'

export function InfoCardsTop({
  totalViews,
  totalBudget,
  totalComisy,
  totalComisyAdtech,
  totalbudjetChannel,
  uniqueChannelNameFiltered,
}) {
  return (
    <div className="flex gap-3">
      {/*Просмотры*/}
      <div
        className="flex flex-col justify-center text-base  h-[70px] text-white rounded-[14px]	bg-[#b5e4ca80] items-normal px-6	">
        <div>Просмотры</div>
        {totalViews > 0 && (
          <div>
            <FormatterView data={totalViews}/>
          </div>
        )}
      </div>
      {/*Просмотры*/}

      {/*Бюджет*/}
      <div
        className="flex flex-col  justify-center text-base h-[70px]  bg-[#FFFFFF1A]	text-white  rounded-[14px]	  items-normal  px-6	">
        <div>Бюджет</div>
        <div>
          {totalBudget > 0 && (
            <div>
              <TiinFormatterBudget budget={totalBudget}/>
            </div>
          )}
        </div>
      </div>
      {/*Бюджет*/}

      {/*Комиссия*/}
      <div
        className="flex flex-col text-base justify-center  h-[70px]  bg-[#2a85ff78]	text-white  rounded-[14px]	  items-normal  px-6	">
        <div>Комиссия</div>
        <div className="flex gap-2">
          <div>
            {totalComisyAdtech > 0 && (
              <div>
                <TiinFormatterBudget budget={totalComisyAdtech}/>
              </div>
            )}
            <div className="text-[10px] leading-3">Adtech</div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col text-base justify-center  h-[70px]  bg-[#2a85ff78]	text-white  rounded-[14px]	  items-normal  px-6	">
        <div>Комиссия</div>
        <div className="flex gap-2">
          <div>
            {totalComisy > 0 && (
              <div>
                <TiinFormatterBudget budget={totalComisy}/>
              </div>
            )}
            <div className="text-[10px] leading-3">Агенство</div>
          </div>
        </div>
      </div>
      {/*Комиссия*/}

      {/*К оплате*/}
      <div
        className="flex flex-col text-base justify-center   h-[70px] text-white rounded-[14px]	bg-[#FFFFFF1A] items-normal px-6	">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-context-menu	 hover:text-[#2a85ff78]	">
                  {' '}
                  К оплате - {truncate (uniqueChannelNameFiltered[0], 20)}...
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{uniqueChannelNameFiltered}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {totalbudjetChannel > 0 && (
          <div>
            <TiinFormatterBudget budget={totalbudjetChannel}/>
          </div>
        )}
      </div>
      {/*К оплате*/}
    </div>
  )
}
