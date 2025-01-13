import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/auth/authSlice'
import publisher from '../redux/publisher/publisherSlice'
import inventory from '../redux/inventory/inventorySlice'

import googleauthSlice from './googleauth/googleauthSlice'
import videoSlice from './video/videoSlice'
import advertiserSlice from './advertiser/advertiserSlice'
import publisherUsersSlice from './publisherUsers/publisherUsersSlice'
import advertiserUsersSlice from './advertiserUsers/advertiserUsersSlice'
import orderSlice from './order/orderSlice'
import statusSlice from './orderStatus/orderStatusSlice'
import orderTableSlice from './orderTableSlice/orderTableSlice'
import inventoryStatusSlice from './inventoryStatus/inventoryStatusSlice'
import channelSlice from './channel/channelSlice'
import channelUsersSlice from './channelUsers/channelUsersSlice'
import advertiserAgencySlice from './AgencySlice/advertiserAgency/advertiserAgencySlice'
import advertiserAgencyUsersSlice from './AgencySlice/advertiserAgencyUsers/advertiserAgencyUsersSlice'
import statisticsSlice from './statisticsSlice'
import modalSlice from './modalSlice'
import revenueSlice from './revenueSlice'
import sentToPublisher from "@/redux/order/SentToPublisher.js";

const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    publisher: publisher,
    publisherUser: publisherUsersSlice,
    advertiserAgency: advertiserAgencySlice,
    advertiserAgencyUsers: advertiserAgencyUsersSlice,
    inventory: inventory,
    channelUsers: channelUsersSlice,
    googleAuth: googleauthSlice,
    video: videoSlice,
    advertiser: advertiserSlice,
    advertiserUsers: advertiserUsersSlice,
    order: orderSlice,
    status: statusSlice,
    channel: channelSlice,
    inventoryStatus: inventoryStatusSlice,
    orderTable: orderTableSlice,
    statistics: statisticsSlice,
    revenue: revenueSlice,
    modal: modalSlice,
    sentToPublisher: sentToPublisher,

  },
})

export default store
