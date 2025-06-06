import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog.jsx'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/redux/auth/authSlice.js'

const LogoutDialog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    console.log('asdas')
  }
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-white">
          Выйти из системы Brandformance
        </AlertDialogTitle>
        <AlertDialogDescription className="text-white">
          Вы точно хотите выйти?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="!flex">
        <AlertDialogCancel className="text-white w-[100px]">
          Нет
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 w-[100px]"
        >
          Да
        </AlertDialogAction>
      </AlertDialogFooter>
    </div>
  )
}

export default LogoutDialog
