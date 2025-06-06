import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

import backendURL from '@/utils/url'

const initialState = {
  statistics: [],
  statisticsChannel: [],
  statisticsVideo: [],
  status: '',
  error: null,
}

export const fetchStatistics = createAsyncThunk(
  'statistics/fetchStatistics',
  async ({ adv_id, order_id, startDate, endDate }, { rejectWithValue }) => {
    const token = Cookies.get('token')
    let url = `${backendURL}/order/statistics/`
    let hasParam = false

    if (adv_id) {
      url += `?advertiser=${adv_id}`
      hasParam = true
    } else if (order_id) {
      url += `?order_id=${order_id}`
      hasParam = true
    }

    if (startDate && endDate) {
      url +=
        (hasParam ? '&' : '?') + `start_date=${startDate}&end_date=${endDate}`
    } else if (startDate) {
      url += (hasParam ? '&' : '?') + `start_date=${startDate}`
    } else if (endDate) {
      url += (hasParam ? '&' : '?') + `end_date=${endDate}`
    }

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)
export const fetchVideoStatistics = createAsyncThunk(
  'statistics/fetchVideoStatistics',
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.get(
        `${backendURL}/publisher/channel/${id}/video-statistics/`,

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
      return rejectWithValue(error.response)
    }
  },
)

export const fetchChannelStatistics = createAsyncThunk(
  'statistics/fetchChannelStatistics',
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.get(
        `${backendURL}/publisher/channel/${id}/statistics/`,

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
      return rejectWithValue(error?.response?.data)
    }
  },
)

const staticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    clearStatistics: (state) => {
      state.statisticsChannel = []
      state.statisticsVideo = []
      state.statistics = []
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.statistics = action.payload
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchVideoStatistics.pending, (state) => {
        state.status = 'loading'
        state.statisticsVideo = []
      })
      .addCase(fetchVideoStatistics.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.statisticsVideo = action.payload
      })
      .addCase(fetchVideoStatistics.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchChannelStatistics.pending, (state) => {
        state.status = 'loading'
        state.statisticsChannel = []
      })
      .addCase(fetchChannelStatistics.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.statisticsChannel = action.payload
      })
      .addCase(fetchChannelStatistics.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
export const { clearStatistics } = staticsSlice.actions

export default staticsSlice.reducer
