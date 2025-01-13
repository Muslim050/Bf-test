import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
import backendURL from '@/utils/url'

const initialState = {
  status: 'idle',
  error: null,
  authUrl: '',
}

export const googleAuth = createAsyncThunk(
  'channel/googleAuth',
  async (pubId) => {
    try {
      const response = await axios.post(
        `${backendURL}/publisher/credentials/`,
        { channel_id: pubId, is_for_update: true },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error
        if (errorMessage.detail) {
          toast.error(errorMessage.detail) // Отображение деталей ошибки с помощью toast
        }
      } else {
        toast.error('Ошибка при загрузке') // Общее сообщение об ошибке, если детали не доступны
      }
      throw error
    }
  },
)

const googleauthSlice = createSlice({
  name: 'googleauth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(googleAuth.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.authUrl = action.payload.data.auth_url
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default googleauthSlice.reducer
