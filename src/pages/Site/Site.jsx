import React, { lazy, Suspense } from 'react'
import style from './site.module.scss'
const Header = lazy(() => import('@/components/Site/Header/Header.jsx'));
const FirstPage = lazy(() => import('@/components/Site/FirstPage/FirstPage.jsx'));
const ThirdPage = lazy(() => import('@/components/Site/ThirdPage'));
const FourthPage = lazy(() => import('@/components/Site/FourthPage'));
const FifthPage = lazy(() => import('@/components/Site/FifthPage'));
const FifthPage2 = lazy(() => import('@/components/Site/FifthPage2'));
const FaqPage = lazy(() => import('@/components/Site/FaqPage'));
const SeventhPage = lazy(() => import('@/components/Site/SeventhPage'));
const Footer = lazy(() => import('@/components/Site/Footer'));
import Loading from './PreLoad/PreLoad'
import ScrollToTopButton from '../../components/Site/ScrollToTopButton/ScrollToTopButton'

function Site() {
  const [loading, setLoading] = React.useState(true)

  const handleLoadingComplete = () => {
    setLoading(false)
  }
  return (
    <div className={`${style.wrapperSite} `}>
      {loading ? (
        <Loading onComplete={handleLoadingComplete} />
      ) : (
        <Suspense fallback={<div>Загрузка...</div>}>
          <Header />
          <FirstPage />
          <ThirdPage />
          <FourthPage />
          <FifthPage />
          <FifthPage2 />
          <FaqPage />
          <SeventhPage />
          <Footer />
          <ScrollToTopButton />
        </Suspense>
      )}
    </div>
  )
}

export default Site
