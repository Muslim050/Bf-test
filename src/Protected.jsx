import { Navigate } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Site from './pages/Site/Site'
import Cookies from 'js-cookie'

function Protected({ children, allowedRoles }) {
  // console.log('allowedRoles', allowedRoles)

  const token = Cookies.get('token')
  const userRole = Cookies.get('role')

  if (token !== token) {
    return <Navigate to="/login" replace />
  } else if (token === null) {
    return (
      <Routes>
        <Route path="/" index element={<Site />}></Route>
      </Routes>
    )
  }

  // if (!allowedRoles.includes(userRole)) {
  //   return (
  //     <div
  //       style={{
  //         height: '80vh',
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //       }}
  //     >
  //       <div
  //         style={{
  //           width: '400px',
  //           textAlign: 'center',
  //           fontWeight: '500',
  //           fontSize: '24px',
  //         }}
  //       >
  //         Не достаточно прав для просмотра данного контента!
  //       </div>
  //     </div>
  //   )
  // }
  return children
}

export default Protected
