import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncAction'
export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: null,
    isLoading: false
  },
  reducers: {},

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(actions.getBooks.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false
      state.books = action.payload
    })
    builder.addCase(actions.getBooks.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false
      state.errorMessage = action.payload // .message
    })
  }
})

// export const {} = booksSlice.actions

export default booksSlice.reducer
