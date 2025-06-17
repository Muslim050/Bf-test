import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import backendURL from '@/utils/url'
import axiosInstance from '@/api/api.js'

const initialState = {
  advertiserAgency: [],
  status: 'idle',
  error: null,
  total_count: 0, // Изначально общее количество равно 0
}

export const fetchAdvertiserAgency = createAsyncThunk(
  'advertiserAgency/fetchAdvertiserAgency',
  async ({ page = null, pageSize = null } = {}, { rejectWithValue }) => {
    try {
      const params = {
        ...(page && { page }),
        ...(pageSize && { page_size: pageSize }),
      }
      const response = await axiosInstance.get(
        '/advertiser/advertising-agency/',
        { params },
      )
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)
export const addAdvertiserAgency = createAsyncThunk(
  'advertiserAgency/addAdvertiserAgency',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${backendURL}/advertiser/advertising-agency/`,
        {
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          commission_rate: data.commission_rate,
        },
      )
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const editAdvertiserAgency = createAsyncThunk(
  'advertiserAgency/editAdvertiserAgency',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${backendURL}/advertiser/advertising-agency/${id}/`,
        {
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          commission_rate: data.commission_rate,
        },
      )
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)
const advertiserAgencySlice = createSlice({
  name: 'advertiserAgency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertiserAgency.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAdvertiserAgency.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.advertiserAgency = action.payload
        state.total_count = action.payload?.count // Обновляем общее количество
      })
      .addCase(fetchAdvertiserAgency.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addAdvertiserAgency.fulfilled, (state, action) => {
        state.advertiserAgency.push(action.payload)
        state.status = 'succeeded'
      })
      .addCase(editAdvertiserAgency.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editAdvertiserAgency.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(editAdvertiserAgency.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default advertiserAgencySlice.reducer
