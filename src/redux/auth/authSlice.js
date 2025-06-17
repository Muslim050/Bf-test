import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
import { toastConfig } from '@/utils/toastConfig'
import backendURL from '@/utils/url'
import Cookies from 'js-cookie'

export const login = createAsyncThunk(
  'auth/login',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/user/token`,
        {
          username: data.login,
          password: data.password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )

      return response.data
      // if (response.status === 200) {
      //   // Обработка успешного ответа
      //   toast.success(response.data.message, {
      //     duration: 3000,
      //   })
      //   return response.data
      // }
    } catch (error) {
      // console.log(error)
      // toast.error(error?.response?.data.error.detail, {
      //   duration: 3000,
      // })
      return rejectWithValue(error.response)
    }
  },
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.put(
        `${backendURL}/user/change-password/${data.id}/`,
        {
          old_password: data.data.oldPassword,
          password: data.data.newPassword,
          password2: data.data.confirmPassword,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.status === 200) {
        // Обработка успешного ответа
        toast.success('Пароль успешно изменен!', toastConfig)
        return response.data
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error
        if (errorMessage.detail) {
          toast.error(
            'Ошибка при изменении пароля. Пожалуйста, попробуйте снова.',
            toastConfig,
          )
        }
      }
      throw new Error('Ошибка при загрузке: ' + error.message)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('token'),
    isAuthenticated: false,
    isLoading: false,
    error: null,
    idPublisher: null,
    role: '',
  },
  reducers: {
    logout() {
      Cookies.remove('channelId')
      Cookies.remove('token')
      Cookies.remove('role')
      Cookies.remove('username')
      Cookies.remove('advertiser')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.data.access
        state.isAuthenticated = true
        state.isLoading = false
        state.error = null
        Cookies.set('role', action.payload.data.role)
        Cookies.set('channelId', action.payload.data.id)
        Cookies.set('token', action.payload.data.access)
        Cookies.set('username', action.payload.data.username)
        Cookies.set('advertiser', action.payload.data.advertiser)

        // localStorage.setItem("refresh_token", action.payload.data.refresh);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
          ? action.payload.message
          : 'Unknown error occurred.'
      })
      .addCase(changePassword.fulfilled, () => {
        // localStorage.setItem("refresh_token", action.payload.data.refresh);
      })
    // .addCase(refreshAccessToken.fulfilled, (state, action) => {
    //   state.token = action.payload.token;
    //   localStorage.setItem("token", action.payload.data.access);
    // });
  },
})

export default authSlice.reducer
export const { logout } = authSlice.actions
