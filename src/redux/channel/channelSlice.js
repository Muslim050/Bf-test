import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import backendURL from '@/utils/url'
import axiosInstance from '@/api/api.js'

const initialState = {
  channel: [],
  channelID: [],
  status: 'idle',
  error: null,
  total_count: 0, // Изначально общее количество равно 0
}

export const fetchChannel = createAsyncThunk(
  'channel/fetchChannel',
  async (
    { id = null, page = null, pageSize = null } = {},
    { rejectWithValue },
  ) => {
    let url = new URL(`${backendURL}/publisher/channel/`)
    const params = new URLSearchParams()
    if (id) {
      params.append('publisher_id', id)
    }
    if (page) {
      params.append('page', page)
    }
    if (pageSize) {
      params.append('page_size', pageSize)
    }
    url.search = params.toString()

    try {
      const response = await axiosInstance(url.href)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addChannel = createAsyncThunk(
  'channel/addChannel',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${backendURL}/publisher/channel/`,
        {
          publisher: data.publisher,
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          channel_id: data.channelId,
          commission_rate: data.commission_rate,
        },
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannel.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.channel = action.payload
        state.total_count = action.payload?.count // Обновляем общее количество
      })
      .addCase(fetchChannel.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

    // .addCase(updateUser.fulfilled, (state, action) => {
    //   const { id, firstName, lastName, email } = action.payload;
    //   const user = state.users.find((user) => user.id === id);
    //   if (user) {
    //     user.firstName = firstName;
    //     user.lastName = lastName;
    //     user.email = email;
    //   }
    //   state.userToEdit = null;
    // })
  },
})

export default channelSlice.reducer
