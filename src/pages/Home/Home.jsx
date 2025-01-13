import { useLocation } from 'react-router-dom'
import Site from '../Site/Site'
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import { gsap } from 'gsap'
import SystemLayout from '@/pages/SystemLayout.jsx';

const Home = () => {
  const { pathname } = useLocation()
  const { bgColor, textColor } = React.useContext(ThemeContext)

  const contentRef = React.useRef(null)

  React.useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        backgroundColor: bgColor,
        color: textColor,
        duration: 1.5,
      })
    }
    }, [bgColor, textColor])
  // const defaultLayout = 300 // Инициализация значением по умолчанию

  return (
    <>
      {pathname === '/' ? (
        <Routes>
          <Route path="/" index element={<Site />}></Route>
        </Routes>
      ) : (
        <div>
          <SystemLayout/>
        </div>
      )}
    </>
  )
}

export default Home
