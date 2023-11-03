import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../apis'

export const getCategories = createAsyncThunk('app/categories', async (data, { rejectWithValue }) => {
  const response = await api.apiGetCategories()
  if (!response) return rejectWithValue(response)
  return response.data

})
