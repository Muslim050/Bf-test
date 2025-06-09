'use client'

import { ChevronRight } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Link, NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import backendURL from '@/utils/url.js'
import { menuItems } from '@/module/Sidebar/MenuItems.js'
import { Badge } from '@/components/ui/badge.jsx'
import { fetchVideos } from '@/redux/video/videoSlice.js'
import { cn } from '@/lib/utils.js'

export function NavMain({ userRole }) {
  const pathname = location.pathname

  const userRoles = userRole ? [userRole] : [] // Преобразуем строку в массив, если существует роль
  const { order } = useSelector((state) => state.order)
  const { channel } = useSelector((state) => state.channel)
  const [filteredOrders, setFilteredOrders] = React.useState('')
  const hasAccess = (roles) => {
    return roles?.some((role) => userRoles.includes(role)) // Проверяем наличие хотя бы одной роли
  }
  const { listsentPublisher } = useSelector((state) => state.sentToPublisher)
  const dispatch = useDispatch()
  const user = Cookies.get('role')

  const [videos, setVideos] = useState()

  React.useEffect(() => {
    async function loadVideos() {
      const data = await fetchVideos({
        page: 1,
        pageSize: 300,
      })
      setVideos(data)
    }
    loadVideos()
  }, [])
  const fetchfilteredOrders = async ({ status }) => {
    const token = Cookies.get('token')
    const response = await axios.get(
      `${backendURL}/order/order-count-by-status/?status=${status}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setFilteredOrders(response.data.data.count)
  }
  const filteredOrdersAdvertiser = order?.filter || []
  // const filteredChannel = channel.filter((i) => i.is_connected === false) || []
  const filteredChannel = channel.filter || []
  // const filteredChannelIsActive = channel.filter((i) => i.is_active === false)
  const filteredChannelIsActive = channel.filter || []

  // const filtredSentPublisher = listsentPublisher.filter((i) => i.order_status === 'in_review') || []
  const filtredSentPublisher = listsentPublisher.filter || []
  const filteredVideo = (videos && videos?.filter) || []
  const updateMenuItems = (items) => {
    return items.map((item) => {
      if (item.title === 'Заказы') {
        if (userRole === 'advertiser' || userRole === 'advertising_agency') {
          return {
            ...item,
            color: 'green',
            label: filteredOrdersAdvertiser.length.toString(),
          }
        } else if (userRole === 'publisher' || userRole === 'channel') {
          return {
            ...item,
            color: filtredSentPublisher.length > 0 ? 'green' : 'bg-[#ff9800]',
            label: filtredSentPublisher.length.toString(),
          }
        } else if (userRole === 'admin') {
          return {
            ...item,
            color: 'green',
            label: filteredOrders.length || filteredOrders,
          }
        }
      }

      if (item.title === 'Каналы') {
        if (
          userRole === 'publisher' ||
          userRole === 'admin' ||
          userRole === 'channel'
        ) {
          return {
            ...item,
            color: 'bg-red-500',

            label: filteredChannel.length.toString(),
          }
          // eslint-disable-next-line no-dupe-else-if
        }
      }

      if (
        item.title === 'Видео' &&
        (userRole === 'publisher' ||
          userRole === 'admin' ||
          userRole === 'channel')
      ) {
        return {
          ...item,
          color: 'bg-red-500',

          label: filteredVideo.length.toString(),
        }
      }
      return item
    })
  }
  const updatedMenuItems = updateMenuItems(menuItems)
  const isMenuActive = (item) => {
    if (item.subMenu?.length) {
      return item.subMenu.some(
        (sub) => pathname === sub.to || pathname.startsWith(sub.to + '/'),
      )
    }
    return pathname === item.to || pathname.startsWith(item.to + '/')
  }

  React.useEffect(() => {
    const fetchData = async () => {
      if (user === 'admin') {
        await fetchfilteredOrders({ status: 'sent' })
      }
    }

    fetchData()
  }, [dispatch, user])

  const { state } = useSidebar() // из контекста: 'expanded' или 'collapsed'
  console.log(state)
  return (
    <SidebarGroup>
      <SidebarMenu>
        {updatedMenuItems
          .filter((item) => hasAccess(item.roles))
          .map((item) => {
            const isActive = isMenuActive(item)

            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <NavLink
                      to={item.to || '#'}
                      className="flex items-center gap-2"
                    >
                      <SidebarMenuButton
                        className="w-full"
                        isActive={isActive}
                        tooltip={{
                          children: item?.subMenu ? (
                            <div className="flex flex-col min-w-[180px]">
                              <div className="font-semibold px-3 pt-2 pb-1">
                                {item.title}
                              </div>
                              {item.subMenu.map((sub) => (
                                <Link
                                  to={sub.to || '#'}
                                  key={sub.title}
                                  className={`hover:bg-muted px-3 py-1 rounded cursor-pointer  
                          ${pathname.startsWith(sub.to) ? 'bg-muted font-bold' : ''}`}
                                >
                                  {sub.icon && <sub.icon />}
                                  <span>{sub.title}</span>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            item.title
                          ),
                        }}
                      >
                        <div className="flex gap-2 items-center relative">
                          {item.icon && <item.icon />}
                        </div>
                        {state === 'collapsed' && item.label > 0 && (
                          <span className="absolute -top-3 -right-4 -translate-x-1/2 z-10">
                            <Badge
                              className={`px-1.5 py-0 text-xs ${
                                item.color === 'green'
                                  ? 'bg-[#05c800]'
                                  : item.color
                              }`}
                            >
                              {item.label}
                            </Badge>
                          </span>
                        )}
                        {state !== 'collapsed' && (
                          <>
                            <span className="ml-2">{item.title}</span>
                            <div>
                              {item.label > 0 ? (
                                <>
                                  <span
                                    className={`
                                      'ml-auto',
                                      ${
                                        item.variant === 'default' &&
                                        'text-background dark:text-white'
                                      },
                                    `}
                                  >
                                    <Badge
                                      className={`px-1.5 py-0 ${item.color === 'green' ? 'bg-[#05c800]' : item.color}`}
                                    >
                                      {item.label}
                                      {item.title === 'Каналы' &&
                                        userRole === 'admin' && (
                                          <span
                                            className={cn(
                                              'ml-auto',
                                              item.variant === 'default' &&
                                                'text-background dark:text-white',
                                            )}
                                          >
                                            +
                                            {filteredChannelIsActive.length.toString()}
                                          </span>
                                        )}
                                    </Badge>
                                  </span>
                                </>
                              ) : null}
                            </div>
                          </>
                        )}

                        {item.subMenu && (
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    </NavLink>
                  </CollapsibleTrigger>
                  {item.subMenu ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subMenu.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <Link to={subItem.to}>
                              <SidebarMenuSubButton asChild>
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            )
          })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
