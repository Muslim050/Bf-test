import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import backendURL from '@/utils/url'
import axiosInstance from "@/api/api.js";

const initialState = {
  advertiserUsers: [],
  status: 'idle',
  error: null,
  total_count: 0, // Изначально общее количество равно 0

}
export const fetchAdvertiserUsers = createAsyncThunk(
  'advertiserusers/fetchAdvertiserUsers',
  async ({ page = 1, pageSize = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`advertiser/user/`, {
        params: { page, page_size: pageSize },
      });
      return response.data.data; // Предполагается, что ваш API возвращает данные в поле `data`
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addAdvertiserUsers = createAsyncThunk(
  'advertiserusers/addAdvertiserUsers',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${backendURL}/advertiser/user/`,
        {
          advertiser: data.advertiser,
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
          username: data.username,
          phone_number: data.phone,
          password: data.password,
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

const advertiserUsersSlice = createSlice({
  name: 'advertiser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertiserUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAdvertiserUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.advertiserUsers = action.payload
        state.total_count = action.payload?.count; // Обновляем общее количество

      })
      .addCase(fetchAdvertiserUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addAdvertiserUsers.fulfilled, (state, action) => {
        state.advertiserUsers.push(action.payload.data)
        state.status = 'succeeded'
      })
  },
})
// export const selectUsers = (state) => state.users.users;

export default advertiserUsersSlice.reducer
