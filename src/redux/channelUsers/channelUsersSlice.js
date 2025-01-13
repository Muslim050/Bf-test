import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import backendURL from '@/utils/url'
import Cookies from 'js-cookie'
import axiosInstance from "@/api/api.js";

const initialState = {
  channelUsers: [],
  status: 'idle',
  error: null,
  total_count: 0, // Изначально общее количество равно 0

}

export const fetchChannelUsers = createAsyncThunk(
  'channelusers/fetchChannelUsers',
  async ({page = null, pageSize = null } = {}, { rejectWithValue }) => {
    let url = new URL(`${backendURL}/publisher/channel/user/`)
    const params = new URLSearchParams()
    if (page) {
      params.append('page', page);
    }
    if (pageSize) {
      params.append('page_size', pageSize);
    }
    try {
      const response = await axiosInstance.get(url.href)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

export const addChannelUsers = createAsyncThunk(
  'channelusers/addChannelUsers',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/publisher/channel/user/`,
        {
          channel: data.channel,
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
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  },
)

// export const deletePublisherUsers = createAsyncThunk(
//   "publisherusers/deletePublisherUsers",
//   async ({ id }) => {
//     console.log(id);
//     const token = Cookies.get
// 'token',

//     const response = await axios.post(
//       `/publisher/user/${id}/`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response;
//   }
// );

const publisherUsersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchChannelUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.channelUsers = action.payload
        state.total_count = action.payload?.count; // Обновляем общее количество

      })
      .addCase(fetchChannelUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addChannelUsers.fulfilled, (state, action) => {
        state.channelUsers.push(action.payload.data)
        state.status = 'succeeded'
      })
    // .addCase(deletePublisherUsers.fulfilled, (state, action) => {
    //   state.publisherUsers = state.publisherUsers.filter(
    //     (user) => user.id !== action.payload
    //   );
    // });
  },
})
export const selectUsers = (state) => state.users.users

export default publisherUsersSlice.reducer
