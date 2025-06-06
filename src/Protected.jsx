import { Navigate, Route, Routes } from 'react-router-dom'
import Site from './pages/Site/Site'
import Cookies from 'js-cookie'

function Protected({ children }) {
  const token = Cookies.get('token')

  if (token !== token) {
    return <Navigate to="/login" replace />
  } else if (token === null) {
    return (
      <Routes>
        <Route path="/" index element={<Site />}></Route>
      </Routes>
    )
  }

  return children
}

export default Protected
