import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
import backendURL from '@/utils/url'
import Cookies from 'js-cookie'

const initialState = {
  status: 'idle',
  error: null,
  statusb: '',
}
export const inventoryPrebook = createAsyncThunk(
  'inventorystatus/inventoryPrebook',
  async (data) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/inventory/prebook/`,
        {
          inventory_id: data.inventory_id,
          order_id: data.expandedRows,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      return response
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

export const inventoryVerify = createAsyncThunk(
  'inventorystatus/inventoryVerify',
  async (data) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/inventory/verify/`,
        {
          inventory_id: data.data.inventory,
          order_id: data.data.order,
          verified_link: data.data.linkvideo,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error
        if (errorMessage.detail) {
          toast.error(errorMessage.detail) // Отображение деталей ошибки с помощью toast
        }
      } else {
        toast.error('Ошибка при загрузке') // Общее сообщение об ошибке, если детали не доступны
      }
      return Promise.reject(error)
    }
  },
)

const inventoryStatusSlice = createSlice({
  name: 'inventorystatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(inventoryPrebook.fulfilled, (state, action) => {
      state.status = 'succeeded'
    })
  },
})

export default inventoryStatusSlice.reducer
