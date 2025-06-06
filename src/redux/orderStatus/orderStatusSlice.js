import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
import backendURL from '@/utils/url'
import Cookies from 'js-cookie'

const initialState = {
  status: 'idle',
  error: null,
  statusb: '',
}

export const fetchViewStatus = createAsyncThunk(
  'order/fetchViewStatus',
  async (orderID) => {
    const token = Cookies.get('token')
    try {
      const response = await axios.post(
        `${backendURL}/order/accept-order/`,
        {
          order_id: orderID,
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
      throw error
    }
  },
)

export const confirmByChannel = createAsyncThunk(
  'order/comfirmByChannel',
  async (data) => {
    const token = Cookies.get('token')
    try {
      const response = await axios.post(
        `${backendURL}/order/confirm-by-channel/`,
        {
          order_id: data.inventory,
          inventory_id: data.expandedRows,
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
      throw error
    }
  },
)

export const removeInventories = createAsyncThunk(
  'order/removeInventories',
  async ({ expandedRows, inventory_id }, { rejectWithValue }) => {
    const token = Cookies.get('token')
    try {
      const response = await axios.post(
        `${backendURL}/order/remove-inventory/`,
        {
          order_id: expandedRows,
          inventory_id: inventory_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      return { expandedRows, inventory_id } // Возвращаем данные, чтобы использовать их в reducer
    } catch (error) {
      return rejectWithValue(error.response.data) // Возвращаем ошибку с данными из response.data
    }
  },
)

export const deactivateInventories = createAsyncThunk(
  'order/deactivateInventories',
  async ({ inventory_id }, { rejectWithValue }) => {
    const token = Cookies.get('token')
    try {
      const response = await axios.post(
        `${backendURL}/inventory/deactivate/`,
        {
          inventory_id: inventory_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      return { inventory_id } // Возвращаем данные, чтобы использовать их в reducer
    } catch (error) {
      return rejectWithValue(error.response.data) // Возвращаем ошибку с данными из response.data
    }
  },
)

export const deletedComplitedOrder = createAsyncThunk(
  'order/deletedComplitedOrder',
  async ({ inventory_id }, { rejectWithValue }) => {
    const token = Cookies.get('token')
    try {
      const response = await axios.post(
        `${backendURL}/inventory/confirm-removal/`,
        {
          inventory_id: inventory_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      return { inventory_id } // Возвращаем данные, чтобы использовать их в reducer
    } catch (error) {
      return rejectWithValue(error.response.data) // Возвращаем ошибку с данными из response.data
    }
  },
)

export const confirmOrder = createAsyncThunk(
  'order/confirmOrder',
  async ({ expandedRows }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/order/confirm-by-admin/`,
        {
          order_id: expandedRows,
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
      throw error
    }
  },
)

export const finishOrder = createAsyncThunk(
  'order/finishOrder',
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/order/finish/`,

        {
          order_id: id,
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
      return rejectWithValue(error.response)
    }
  },
)

const orderStatusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchViewStatus.fulfilled, (state, action) => {
        state.statusb = action.payload.data.status
        state.status = 'succeeded'
      })
      .addCase(removeInventories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(removeInventories.fulfilled, (state, action) => {
        const { expandedRows } = action.payload

        if (Array.isArray(state.expandedRows)) {
          state.expandedRows = state.expandedRows.filter(
            (row) => row !== expandedRows,
          )
        }

        state.status = 'succeeded'
      })
      .addCase(removeInventories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(deactivateInventories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(deactivateInventories.fulfilled, (state, action) => {
        const { expandedRows } = action.payload

        if (Array.isArray(state.expandedRows)) {
          state.expandedRows = state.expandedRows.filter(
            (row) => row !== expandedRows,
          )
        }

        state.status = 'succeeded'
      })
      .addCase(deactivateInventories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(confirmOrder.fulfilled, (state) => {
        state.status = 'succeeded'
        toast.success('Инвентарь подтвержден!')
      })
      .addCase(confirmOrder.rejected, (state) => {
        state.status = 'failed'
        toast.error(
          'Инвентори этого заказа все еще открыты или предварительно забронированы.!',
        )
      })
      .addCase(confirmByChannel.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(finishOrder.fulfilled, (state) => {
        state.status = 'succeeded'
        toast.success('Заказ успешно финиширован!')
      })
      .addCase(finishOrder.rejected, (state) => {
        state.status = 'failed'
        // Здесь обрабатываем ошибку запроса
        toast.error(
          'Чтобы завершить заказ, сначала необходимо деактивировать все инвентари этого заказа!',
        ) // Выводим сообщение об ошибке
        // ...обновление состояния...
      })

      .addCase(deletedComplitedOrder.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(deletedComplitedOrder.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default orderStatusSlice.reducer
