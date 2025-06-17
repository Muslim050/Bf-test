import React from 'react'
import { TableCell } from '@/components/ui/table'
import FormatterView from '@/components/Labrery/formatter/FormatterView'
import { TiinFormatterBudget } from '@/components/Labrery/formatter/FormatterBudjet'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'
import { truncate } from '@/utils/other.js'
import { Monitor, MonitorPlay, MonitorUp } from 'lucide-react'

function AdvChartData({ statistic, index }) {
  const { bgColor } = React.useContext(ThemeContext)

  const uniqueGendersss = statistic.gender_percentages
  const uniqueAge = statistic.age_group_percentages
  const uniqueGeo =
    statistic.budget === 11899087.5 //YangiKulgu Official
      ? [{ country: 'UZ', percentage: 100 }]
      : statistic.geo_percentages
  const { textColor } = React.useContext(ThemeContext)

  return (
    <>
      <TableCell
        data-label="ID"
        className={`font-normal text-${textColor} text-sm `}
      >
        {' '}
        {index + 1}
      </TableCell>
      <TableCell
        data-label="ID"
        className={`font-normal text-${textColor} text-sm `}
      >
        {statistic.channel_name}
      </TableCell>
      <TableCell
        data-label="ID"
        className={`font-normal text-${textColor} text-sm `}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="hover:text-[#4793ff] hover:underline text-[#A7CCFF]">
              {truncate(
                statistic.video_name === null ? '' : statistic.video_name,
                20,
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{statistic.video_name}</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell
        data-label="ID"
        className={`font-normal text-${textColor} text-sm `}
      >
        <div className="flex items-center gap-1">
          {(statistic.order_format === 'preroll' && <Monitor />) ||
            (statistic.order_format === 'top_preroll' && <MonitorUp />) ||
            (statistic.order_format === 'tv_preroll' && <MonitorPlay />)}
          {(statistic.order_format === 'preroll' && 'Pre-roll') ||
            (statistic.order_format === 'mixroll' && 'Mid-roll') ||
            (statistic.order_format === 'midroll1' && 'Mid-roll 1') ||
            (statistic.order_format === 'midroll2' && 'Mid-roll 2') ||
            (statistic.order_format === 'midroll3' && 'Mid-roll 3') ||
            (statistic.order_format === 'midroll4' && 'Mid-roll 4') ||
            (statistic.order_format === 'top_preroll' && 'Top Pre-roll') ||
            (statistic.order_format === 'tv_preroll' && 'TV Pre-roll')}
        </div>
      </TableCell>
      <TableCell
        data-label="ID"
        className={`font-normal text-${textColor} text-sm `}
      >
        <div>
          <div style={{ display: 'flex', width: '100px' }}>
            {statistic.publication_date === null ? (
              <div>----</div>
            ) : (
              <>
                {new Date(statistic.publication_date).toLocaleDateString(
                  'ru-RU',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  },
                )}
              </>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell
        data-label="ID"
        className={`font-normal text-${textColor} text-sm `}
      >
        {' '}
        {statistic.deactivation_date === null ? (
          <div>----</div>
        ) : (
          <>
            {new Date(statistic.deactivation_date).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </>
        )}
      </TableCell>
      <TableCell
        data-label="ID"
        className={`font-normal text-${textColor} text-sm text-right`}
      >
        {' '}
        {statistic.online_view_count === 0 ? (
          <div
            style={{
              fontSize: '13px',
              lineHeight: '15px',
              color: '#fa8a00',
              fontWeight: '600',
            }}
          >
            Введется <br /> аналитика
          </div>
        ) : (
          // 59 971

          <>
            {statistic.budget === 11899087.5 ? (
              <FormatterView data="59 971" />
            ) : (
              <FormatterView data={statistic.online_view_count} />
            )}
          </>
        )}
      </TableCell>
      <TableCell
        data-label="ID"
        className={`font-normal text-${textColor} text-sm `}
      >
        {' '}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
          }}
        >
          {statistic.budget === 0 ? (
            <div
              style={{
                fontSize: '13px',
                lineHeight: '15px',
                color: '#fa8a00',
                fontWeight: '600',
              }}
            >
              Введется <br /> аналитика
            </div>
          ) : (
            <>
              <TiinFormatterBudget budget={statistic.budget} />
            </>
          )}
        </div>
      </TableCell>

      {uniqueGendersss.length && uniqueAge.length && uniqueGeo.length ? (
        <>
          <TableCell
            data-label="ID"
            className={`font-normal text-${textColor} text-sm text-right`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {uniqueGendersss.length > 0
                ? uniqueGendersss.map((gender, index) => (
                    <td
                      key={`gender-${index}`}
                      data-label="Пол"
                      className={`w-[60px] text-[14px] font-bold ${
                        bgColor ? 'text-blue-600' : 'text-green-500'
                      } `}
                    >
                      {gender.percentage}%
                    </td>
                  ))
                : null}
            </div>
          </TableCell>
          <TableCell
            data-label="ID"
            className={`font-normal text-${textColor} text-sm text-right`}
          >
            <div style={{ display: 'flex', justifyContent: 'start' }}>
              {uniqueAge.length > 0
                ? uniqueAge.map((age, index) => (
                    <td
                      key={`age-${index}`}
                      data-label="Возраст"
                      className={`w-[60px] text-[14px] font-bold ${
                        bgColor ? 'text-blue-600' : 'text-green-500'
                      } `}
                    >
                      {age.percentage}%
                    </td>
                  ))
                : null}
            </div>
          </TableCell>

          <TableCell
            data-label="ID"
            className={`font-normal text-${textColor} text-sm text-right`}
          >
            <div style={{ display: 'flex', justifyContent: 'start' }}>
              {uniqueGeo.length > 0
                ? uniqueGeo.map((geo, index) => (
                    <div
                      key={`geo-${index}`}
                      data-label="Гео"
                      className={`w-[60px] text-[14px] font-bold ${
                        bgColor ? 'text-blue-600' : 'text-green-500'
                      } `}
                    >
                      {geo.percentage}%
                    </div>
                  ))
                : null}
            </div>
          </TableCell>
        </>
      ) : (
        <div style={{ position: 'relative' }}>
          <td
            className="text-gray-400"
            style={{
              position: 'absolute',
              right: '-150%',
              fontSize: '13px',
              lineHeight: '15px',
              fontWeight: '600',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              padding: '0',
              height: '40px',
              alignItems: 'center',
            }}
          >
            Ведется аналитика
          </td>
        </div>
      )}
    </>
  )
}

export default AdvChartData
