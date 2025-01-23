import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

import backendURL from '@/utils/url'
import axiosInstance from "@/api/api.js";

const initialState = {
  publisherUsers: [],
  status: 'idle',
  error: null,
  total_count: 0, // Изначально общее количество равно 0

}

export const fetchPublisherUsers = createAsyncThunk(
  'publisherusers/fetchPublisherUsers',
  async ({ page = null, pageSize = null } = {}, { rejectWithValue }) => {
    try {
      let url = new URL(`${backendURL}/publisher/user/`)
      const params = new URLSearchParams()
      if (page) {
        params.append('page', page);
      }
      if (pageSize) {
        params.append('page_size', pageSize);
      }
      url.search = params.toString()
      const response = await axiosInstance.get(url.href)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addPublisherUsers = createAsyncThunk(
  'publisherusers/addPublisherUsers',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/publisher/user/`,
        {
          publisher: data.publisher,
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
          username: data.username,
          phone_number: data.phone,
          password: data.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log (response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

const publisherUsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublisherUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPublisherUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.publisherUsers = action.payload
        state.total_count = action.payload?.count; // Обновляем общее количество

      })
      .addCase(fetchPublisherUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addPublisherUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
  },
})
export const selectUsers = (state) => state.users.users

export default publisherUsersSlice.reducer
