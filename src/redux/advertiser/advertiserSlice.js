import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import backendURL from '@/utils/url'
import axiosInstance from "@/api/api.js";

const initialState = {
  advertisers: [],
  status: 'idle',
  error: null,
  total_count: 0, // Изначально общее количество равно 0

}

export const fetchAdvertiser = createAsyncThunk(
  'advertiser/fetchAdvertiser',
  async ({ id = null, page = null, pageSize = null } = {}, { rejectWithValue }) => {
    try {
      const params = {
        ...(id && { channel_id: id }),
        ...(page && { page }),
        ...(pageSize && { page_size: pageSize }),
      };
      const response = await axiosInstance.get('/advertiser/', {params})
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addAdvertiser = createAsyncThunk(
  'advertiser/addAdvertiser',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${backendURL}/advertiser/`,
        {
          advertising_agency: data.agency,
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          cpm_preroll: data.cpm_preroll,
          cpm_preroll_uz: data.cpm_preroll_uz,
          cpm_tv_preroll: data.cpm_tv_preroll,
          cpm_tv_preroll_uz: data.cpm_tv_preroll_uz,
          cpm_top_preroll: data.cpm_top_preroll,
          cpm_top_preroll_uz: data.cpm_top_preroll_uz,
        }
      )
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const removeAdvertiser = createAsyncThunk(
  'advertiser/removeAdvertiser',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${backendURL}/advertiser/${data.id}`)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const editAdvertiser = createAsyncThunk(
  'advertiser/editAdvertiser',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `${backendURL}/advertiser/${id}/`,
        {
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          cpm_preroll: data.cpm_preroll,
          cpm_preroll_uz: data.cpm_preroll_uz,
          cpm_top_preroll: data.cpm_top_preroll,
          cpm_top_preroll_uz: data.cpm_top_preroll_uz,
          cpm_tv_preroll: data.cpm_tv_preroll,
          cpm_tv_preroll_uz: data.cpm_tv_preroll_uz,
        })
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

const advertiserSlice = createSlice({
  name: 'advertiser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertiser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAdvertiser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.advertisers = action.payload
        state.total_count = action.payload?.count; // Обновляем общее количество

      })
      .addCase(fetchAdvertiser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addAdvertiser.fulfilled, (state, action) => {
        state.advertisers.push(action.payload)
        state.status = 'succeeded'
      })
      .addCase(removeAdvertiser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeAdvertiser.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(removeAdvertiser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(editAdvertiser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editAdvertiser.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(editAdvertiser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default advertiserSlice.reducer
