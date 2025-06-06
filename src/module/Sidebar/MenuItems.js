import {
  agencySvg,
  channelsSvg,
  inventorySvg,
  ordersSvg,
  publishersSvg,
  reportsSvg,
  videoSvg,
} from '@/assets/SidebarsIcons-ui.jsx'
// import {ordersSvg, overviewSvg} from "../../../assets/SidebarsIcons-ui.jsx";
import { Notebook } from 'lucide-react'

export const menuItems = [
  {
    roles: ['advertising_agency', 'advertiser', 'admin'],
    title: 'Заказы',
    to: '/order',
    icon: ordersSvg,
    accordion: false,
    variant: 'ghost',
    label: '',
  },
  {
    roles: ['channel', 'publisher'],
    title: 'Заказы',
    to: '/sents-order',
    icon: Notebook,
    label: '',
    variant: 'ghost',
  },
  {
    roles: [
      'publisher',
      'channel',
      'admin',
      'advertiser',
      'advertising_agency',
    ],
    title: 'Отчет',
    icon: reportsSvg,
    accordion: true,
    variant: 'ghost',
    subMenu: [
      {
        title: 'Паблишеров',
        to: '/publisher-report',
        roles: ['publisher', 'channel', 'admin'],
      },
      {
        title: 'Рекламодателей',
        to: '/advertiser-report',
        roles: ['advertiser', 'advertising_agency', 'admin'],
      },
    ],
  },

  {
    roles: ['admin'],
    title: 'Инвентарь',
    to: '/inventory',
    icon: inventorySvg,
    accordion: false,
    variant: 'ghost',
    label: '',
  },
  {
    roles: ['admin'],
    title: 'Видео',
    to: '/video',
    icon: videoSvg,
    accordion: false,
    variant: 'ghost',
    label: '',
  },
  {
    roles: ['channel', 'publisher', 'admin'],
    title: 'Каналы',
    to: '/channel',
    icon: channelsSvg,
    accordion: false,
    variant: 'ghost',
    label: '',
  },
  {
    roles: ['publisher', 'admin'],
    title: 'Паблишеры',
    to: '/publisher',
    icon: publishersSvg,
    accordion: false,
    variant: 'ghost',
    label: '',
  },
  {
    roles: ['admin', 'advertising_agency'],
    title: 'Рекламодатели',
    to: '/advertiser',
    icon: publishersSvg,
    accordion: false,
    variant: 'ghost',
    label: '',
  },
  {
    roles: ['admin'],
    title: 'Агентства',
    to: '/advertiser-agency',
    icon: agencySvg,
    accordion: false,
    variant: 'ghost',
    label: '',
  },
]

export const SecondMenuItems = [
  {
    roles: [
      'advertising_agency',
      'advertiser',
      'admin',
      'publisher',
      'channel',
    ],
    title: 'Заказы',
    to: '/order',
    icon: ordersSvg,
    accordion: false,
    variant: 'ghost',
    label: '128',
  },

  {
    roles: ['admin'],
    title: 'Агентства',
    to: '/advertiser-agency',
    icon: agencySvg,
    accordion: false,
    variant: 'ghost',
  },
]

export default function getTitle(title) {
  if (title === 'inventory') {
    return 'Инвентарь'
  } else if (title === 'order') {
    return 'Заказы'
  } else if (title === 'confirmed-order') {
    return 'Потвержденные  заказы'
  } else if (title === 'complited-order') {
    return 'Завершенные заказы'
  } else if (title === 'publisher') {
    return 'Паблишер'
  } else if (title === 'publisher-users') {
    return 'Пользователи паблишера'
  } else if (title === 'video') {
    return 'Видео'
  } else if (title === 'advertiser') {
    return 'Рекламодатели'
  } else if (title === 'advertiser-users') {
    return 'Пользователи рекламодателей'
  } else if (title === 'advertiser-agency') {
    return 'Рекламное агентство'
  } else if (title === 'advertiser-agency-users') {
    return 'Пользователи рекламного агентства'
  } else if (title === 'channel') {
    return 'Канал'
  } else if (title.startsWith('chart-order-table')) {
    return `Статистика заказа`
  } else if (title.startsWith(`publisher-report`)) {
    return `Отчет / Паблишера`
  } else if (title.startsWith(`sents-order`)) {
    return `Заказы - Паблишера / Канала`
  } else if (title.startsWith(`advertiser-report`)) {
    return `Отчет / Рекламодателя`
  } else if (title.startsWith(`statistics-channel`)) {
    return `Статистика канала`
  }
  return ''
}
