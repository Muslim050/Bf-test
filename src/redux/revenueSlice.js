import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'
import backendURL from '@/utils/url'
import Cookies from 'js-cookie'

const initialState = {
  revenue: '',
  status: '',
  error: null,
}

export const fetchRevenue = createAsyncThunk(
  'revenue/fetchRevenue',
  async (data) => {
    const token = Cookies.get('token')
    let url = `${backendURL}/dashboard/revenue/`

    try {
      if (data) {
        url += `?start_date=${data.startDate}&end_date=${data.endDate}`
      }

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error
        if (errorMessage.detail) {
          toast.error(errorMessage.detail) // Displaying detailed error messages using toast
        }
      } else {
        toast.error('Ошибка при загрузке') // Generic error message if details are not available
      }
      throw error
    }
  },
)
const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenue.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.revenue = action.payload
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default revenueSlice.reducer
