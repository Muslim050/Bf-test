import React from 'react'
import { TableHead } from '@/components/ui/table.jsx'
import { ShieldQuestion } from 'lucide-react'
import { MonitorPlay } from 'lucide-react';
import { Tablet } from 'lucide-react';
import { Tv } from 'lucide-react';
import { Monitor } from 'lucide-react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {truncate} from "@/utils/other.js";

function TheadDevaice({ statistic }) {
  const uniqueDeviceTypes = Array.from(
    new Set(statistic.device_type_views?.map((gen) => gen.device_type))
  );

  // Задаем желаемый порядок
  const desiredOrder = ['MOBILE', 'TV', 'TABLET', 'DESKTOP'];

  // Сортируем типы устройств в соответствии с желаемым порядком
  const sortedDeviceTypes = [...uniqueDeviceTypes].sort((a, b) => {
    return desiredOrder.indexOf(a) - desiredOrder.indexOf(b);
  });
  console.log (sortedDeviceTypes)

  return (
    <>
      {sortedDeviceTypes.length > 0
        ? sortedDeviceTypes.map((gender, index) => (
            <TableHead
              key={index}
              className="font-normal text-[#FFFFFF] text-sm text-center !rounded-none"
            >
             <div className='flex justify-center'>
               {
                 gender === 'DESKTOP' &&<TooltipProvider>
                   <Tooltip>
                     <TooltipTrigger asChild className="cursor-pointer">
                       <Monitor/>
                     </TooltipTrigger>
                     <TooltipContent sideOffset={0}>
                       <p>DESKTOP</p>
                     </TooltipContent>
                   </Tooltip>
                 </TooltipProvider>
               }
               {gender === 'TV' &&
                 <TooltipProvider>
                   <Tooltip>
                     <TooltipTrigger asChild className="cursor-pointer">
                       <Tv />
                     </TooltipTrigger>
                     <TooltipContent sideOffset={0}>
                       <p>TV</p>
                     </TooltipContent>
                   </Tooltip>
                 </TooltipProvider>}
               {gender === 'MOBILE' &&
                 <TooltipProvider>
                   <Tooltip>
                     <TooltipTrigger asChild className="cursor-pointer">
                       <svg fill="#ffffff" height="28px" width="28px" version="1.1" id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
                            xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                         <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                         <g id="SVGRepo_iconCarrier"> <g> <g> <path
                           d="M302.933,42.667h-51.2c-7.074,0-12.8,5.726-12.8,12.8s5.726,12.8,12.8,12.8h51.2c7.074,0,12.8-5.726,12.8-12.8 S310.007,42.667,302.933,42.667z"></path> </g> </g>
                           <g> <g> <path
                             d="M358.4,0H153.6c-28.228,0-51.2,22.972-51.2,51.2v409.6c0,28.228,22.972,51.2,51.2,51.2h204.8 c28.228,0,51.2-22.972,51.2-51.2V51.2C409.6,22.972,386.628,0,358.4,0z M384,460.8c0,14.14-11.46,25.6-25.6,25.6H153.6 c-14.14,0-25.6-11.46-25.6-25.6V51.2c0-14.14,11.46-25.6,25.6-25.6h204.8c14.14,0,25.6,11.46,25.6,25.6V460.8z"></path> </g> </g>
                           <g> <g> <circle cx="256" cy="443.733" r="25.6"></circle> </g> </g>
                           <g> <g> <circle cx="209.067" cy="55.467" r="12.8"></circle> </g> </g> </g></svg>
                     </TooltipTrigger>
                     <TooltipContent sideOffset={0}>
                       <p>MOBILE</p>
                     </TooltipContent>
                   </Tooltip>
                 </TooltipProvider>

               }
               {
                 gender === 'TABLET' && <TooltipProvider>
                   <Tooltip>
                     <TooltipTrigger asChild className="cursor-pointer">
                       <Tablet/>
                     </TooltipTrigger>
                     <TooltipContent sideOffset={0}>
                       <p>TABLET</p>
                     </TooltipContent>
                   </Tooltip>
                 </TooltipProvider>
               }
             </div>


            </TableHead>
        ))
        : null}
    </>
  )
}

export default TheadDevaice
