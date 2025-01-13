import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Inventory from './pages/Dashboard/Inventory/Inventory'
import Login from './pages/Login/Login.jsx'
import Video from './pages/Dashboard/video/video'
import Protected from './Protected'
import Order from './pages/Dashboard/Order/Order'
import OrderChart from './pages/Dashboard/OrderChart/OrderChart'
import Publisher from './pages/Dashboard/Pablisher/index.jsx'
import ChannelStatistics from './pages/Dashboard/ChannelStatistics/ChannelStatistics'
import NotFound from './pages/NotFound'
// import Revenue from './pages/Dashboard/Revenue/Revenue'
import PublisherReport from './components/Dashboard/Reports/PublisherReport/PublisherReportTable'
import AdvertiserReport from './components/Dashboard/Reports/AdvertiserReport/AdvertiserReportTable'
import AdvertiserAndUsers from '@/components/Dashboard/Advertiser/index.jsx'
import AdvertiserAgencyAndUsers from '@/components/Dashboard/AdvertiserAgency/index.jsx'
import ChannelMain from './pages/Dashboard/ChannelPage/Index.jsx'
import SentOrder from '@/components/Dashboard/SentOrder/index.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <Protected
              allowedRoles={[
                'admin',
                'advertising_agency',
                'advertiser',
                'publisher',
                'channel',
              ]}
            >
              <Home />
            </Protected>
          }
        >
          <Route
            path="order"
            index
            element={
              <Protected
                allowedRoles={['admin', 'advertising_agency', 'advertiser']}
              >
                <Order />
              </Protected>
            }
          />

          <Route
            path="inventory"
            element={
              <Protected allowedRoles={['channel', 'publisher', 'admin']}>
                <Inventory />
              </Protected>
            }
          />
          {/* <Route
            path="/revenue"
            element={
              <Protected allowedRoles={['admin']}>
                <Revenue />
              </Protected>
            }
          /> */}
          <Route
            path="publisher"
            element={
              <Protected allowedRoles={['publisher', 'admin']}>
                <Publisher />
              </Protected>
            }
          />

          <Route
            path="video"
            element={
              <Protected allowedRoles={['channel', 'publisher', 'admin']}>
                <Video />
              </Protected>
            }
          />
          <Route
            path="advertiser"
            element={
              <Protected allowedRoles={['admin', 'advertising_agency']}>
                <AdvertiserAndUsers />
              </Protected>
            }
          ></Route>

          <Route
            path="advertiser-agency"
            element={
              <Protected allowedRoles={['admin']}>
                <AdvertiserAgencyAndUsers />
              </Protected>
            }
          />
          <Route
            path="sents-order"
            index
            element={
              <Protected allowedRoles={['publisher', 'channel']}>
                <SentOrder />
              </Protected>
            }
          />
          <Route
            path="channel"
            element={
              <Protected allowedRoles={['publisher', 'admin', 'channel']}>
                <ChannelMain />
              </Protected>
            }
          />

          <Route
            path="chart-order-table/:id"
            element={
              <Protected
                allowedRoles={[
                  'publisher',
                  'admin',
                  'channel',
                  'advertising_agency',
                  'advertiser',
                ]}
              >
                <OrderChart />
              </Protected>
            }
          />
          <Route
            path="statistics-channel/:id"
            element={
              <Protected
                allowedRoles={[
                  'admin',
                  'advertising_agency',
                  'advertiser',
                  'publisher',
                  'channel',
                ]}
              >
                <ChannelStatistics />
              </Protected>
            }
          />

          <Route
            path="publisher-report"
            element={
              <Protected allowedRoles={['publisher', 'channel', 'admin']}>
                <PublisherReport />
              </Protected>
            }
          />
          <Route
            path="advertiser-report"
            element={
              <Protected
                allowedRoles={['advertiser', 'advertising_agency', 'admin']}
              >
                <AdvertiserReport />
              </Protected>
            }
          />

          {/* Other routes */}
        </Route>
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />

        {/* Login and NotFound routes */}
      </Routes>
    </>
  )
}

export default App
