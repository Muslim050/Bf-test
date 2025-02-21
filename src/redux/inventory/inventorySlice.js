import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

import backendURL from '@/utils/url'
import {toastConfig} from '../../utils/toastConfig.js'
import toast from 'react-hot-toast'
import axiosInstance from "@/api/api.js";

const initialState = {
  inventory: [],
  diactivatedInventory:[],
  status: '',
  error: null,
  total_count: 0, // Изначально общее количество равно 0
  сomplitedInventories: [],
  сonfirmedInventories: [],
}

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (
    {
      id,
      format,
      status,
      orderAssignmentId,
      page = 1,
      pageSize = 15,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      // Создаем URL и добавляем параметры
      const url = new URL(`${backendURL}/inventory/`);
      const params = new URLSearchParams();

      params.append('page', page);
      params.append('page_size', pageSize);

      if (id) params.append('channel_id', id);
      if (format) params.append('inventory_format', format);
      if (status) params.append('status', status);
      if (orderAssignmentId) params.append('order_assignment_id', orderAssignmentId);

      url.search = params.toString();

      // Делаем запрос
      const response = await axiosInstance.get(url.href);

      // Возвращаем данные
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch inventory' });
    }
  }
);


export const addInventory = createAsyncThunk(
  'inventory/addInventory',
  async ({ data }) => {
    const token = Cookies.get('token')
    try {
      const response = await axios.post(
        `${backendURL}/inventory/`,
        {
          channel: data.channelID,
          video_content: data.video,
          format: data.formatv,
          start_at: data.timecod,
          expected_promo_duration: data.videotiming,
          expected_number_of_views: data.numberview,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.statusText === 'Created') {
        toast.success('Инвентарь успешно создан!', toastConfig)
        return response.data
      }
    } catch (error) {
      if (error.name === 'AxiosError') {
        toast.error(error.message)
      }
      throw error
    }
  },
)
export const inventoryPublish = createAsyncThunk(
  'inventory/inventoryPublish',
  async ({ data }, { rejectWithValue }) => {
    const token = Cookies.get('token')
    try {
      const response = await axios.post(
        `${backendURL}/inventory/publish/`,
        {
          id: data.selectedId,
          link_to_video: data.linkvideo,
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


export const fetchEditInventory = createAsyncThunk(
  'inventory/fetchEditInventory',
  async ({ id, data }) => {
    const token = Cookies.get('token')

    const requestData = { ...data }

    try {
      const response = await axios.patch(
        `${backendURL}/inventory/${id}/`,
        requestData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data.data
    } catch (error) {
      toast.error(error.response.data.error.video_content[0], {
        duration: 3000,
      })
    }
  },
)

export const deleteInventory = createAsyncThunk(
  'inventory/deleteInventory',
  async ({ id }) => {
    const token = Cookies.get('token')

    try {
      const response = await axios.delete(
        `${backendURL}/inventory/${id}`,

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
      if (error.response && error.response.status === 403) {
        throw new Error('Failed to fetch order')
      }
      throw error
    }
  },
)

export const reloadInventory = createAsyncThunk(
  'inventory/reloadInventory',
  async () => {
    const token = Cookies.get('token')

    try {
      const response = await axios.post(
        `${backendURL}/inventory/tasks/save-online-views`,
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
      if (error.response && error.response.status === 403) {
        throw new Error('Failed to fetch order')
      }
      throw error
    }
  },
)

export const fetchDiactivatedInventory = createAsyncThunk(
  'deactivateInventory/fetchInventory',
  async (
    {
      page = 1,
      pageSize = 20,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      // Создаем URL и добавляем параметры
      const url = new URL(`${backendURL}/inventory/deactivated-inventories/`);
      const params = new URLSearchParams();

      params.append('page', page);
      params.append('page_size', pageSize);
      url.search = params.toString();
      // Делаем запрос
      const response = await axiosInstance.get(url.href);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch inventory' });
    }
  }
);



const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    resetInventory(state) {
      state.inventory = [] // Resets to an empty array
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.inventory = action.payload
        state.total_count = action.payload.count; // Обновляем общее количество
        console.log (action)
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addInventory.fulfilled, (state, action) => {
        state.inventory.push(action.payload.data)
        state.status = 'succeeded'
      })
      .addCase(fetchEditInventory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEditInventory.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(fetchEditInventory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteInventory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(reloadInventory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(reloadInventory.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(reloadInventory.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(fetchDiactivatedInventory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDiactivatedInventory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.diactivatedInventory = action.payload
        state.total_count = action.payload.count; // Обновляем общее количество
      })
      .addCase(fetchDiactivatedInventory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})
export const { resetInventory } = inventorySlice.actions

export default inventorySlice.reducer
