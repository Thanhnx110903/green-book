import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../apis'

export const getBooks = createAsyncThunk('books/newBooks', async (data, { rejectWithValue }) => {
  const response = await api.apiBooks()
  // console.log(response);
  if (!response) return rejectWithValue(response)
  return response.data
})
