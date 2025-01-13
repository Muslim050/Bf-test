import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

const initialState = {
  status: 'idle',
  error: null,
  getOrder: [],
}

export const fetchGetOrder = createAsyncThunk(
  'orderTableSlice/fetchGetOrder',
  async ({ expandedRows }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.get(
        `https://adtechmedia.pythonanywhere.com/order/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data.data
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

const orderTableSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrder.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchGetOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.getOrder = action.payload
      })
      .addCase(fetchGetOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default orderTableSlice.reducer
