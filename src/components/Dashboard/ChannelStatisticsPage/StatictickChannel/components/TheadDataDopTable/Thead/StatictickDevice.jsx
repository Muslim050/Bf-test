import { TableHead } from '@/components/ui/table'
import { Monitor, ShieldQuestion, Tablet, Tv } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.jsx'

function StatictickDevice({ dataChannel }) {
  const uniqueDeviceTypes = Array.from(
    new Set(dataChannel.device_type_percentages?.map((gen) => gen.device_type)),
  ).map((device_type) => {
    return dataChannel.device_type_percentages.find(
      (gen) => gen.device_type === device_type,
    )
  })
  const desiredOrder = ['TV', 'MOBILE', 'TABLET', 'DESKTOP', 'OTHER']

  const sortedDeviceTypes = uniqueDeviceTypes.sort((a, b) => {
    return (
      desiredOrder.indexOf(a.device_type) - desiredOrder.indexOf(b.device_type)
    )
  })
  return (
    <>
      {sortedDeviceTypes.length > 0
        ? sortedDeviceTypes.map((device, index) => (
            <TableHead
              key={index}
              className="font-normal text-[#FFFFFF] text-sm text-center !rounded-none"
            >
              <div className="flex justify-center">
                {device.device_type === 'DESKTOP' && (
                  <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <Monitor />
                    </TooltipTrigger>
                    <TooltipContent sideOffset={0}>
                      <p>DESKTOP</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {device.device_type === 'TV' && (
                  <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <Tv />
                    </TooltipTrigger>
                    <TooltipContent sideOffset={0}>
                      <p>TV</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {device.device_type === 'MOBILE' && (
                  <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <svg
                        fill="#ffffff"
                        height="28px"
                        width="28px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {' '}
                          <g>
                            {' '}
                            <g>
                              {' '}
                              <path d="M302.933,42.667h-51.2c-7.074,0-12.8,5.726-12.8,12.8s5.726,12.8,12.8,12.8h51.2c7.074,0,12.8-5.726,12.8-12.8 S310.007,42.667,302.933,42.667z"></path>{' '}
                            </g>{' '}
                          </g>
                          <g>
                            {' '}
                            <g>
                              {' '}
                              <path d="M358.4,0H153.6c-28.228,0-51.2,22.972-51.2,51.2v409.6c0,28.228,22.972,51.2,51.2,51.2h204.8 c28.228,0,51.2-22.972,51.2-51.2V51.2C409.6,22.972,386.628,0,358.4,0z M384,460.8c0,14.14-11.46,25.6-25.6,25.6H153.6 c-14.14,0-25.6-11.46-25.6-25.6V51.2c0-14.14,11.46-25.6,25.6-25.6h204.8c14.14,0,25.6,11.46,25.6,25.6V460.8z"></path>{' '}
                            </g>{' '}
                          </g>
                          <g>
                            {' '}
                            <g>
                              {' '}
                              <circle
                                cx="256"
                                cy="443.733"
                                r="25.6"
                              ></circle>{' '}
                            </g>{' '}
                          </g>
                          <g>
                            {' '}
                            <g>
                              {' '}
                              <circle
                                cx="209.067"
                                cy="55.467"
                                r="12.8"
                              ></circle>{' '}
                            </g>{' '}
                          </g>{' '}
                        </g>
                      </svg>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={0}>
                      <p>MOBILE</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                {device.device_type === 'TABLET' && (
                  <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <Tablet />
                    </TooltipTrigger>
                    <TooltipContent sideOffset={0}>
                      <p>TABLET</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {device.percentage > 0 && (
                  <>
                    {device.device_type === 'OTHER' && (
                      <Tooltip>
                        <TooltipTrigger asChild className="cursor-pointer">
                          <ShieldQuestion />
                        </TooltipTrigger>
                        <TooltipContent sideOffset={0}>
                          <p>Other</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </>
                )}
              </div>
            </TableHead>
          ))
        : null}
    </>
  )
}

export default StatictickDevice
