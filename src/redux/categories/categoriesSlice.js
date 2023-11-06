import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncAction'
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: null,
    isLoading: false
  },
  reducers: {},

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false
      state.categories = action.payload
    })
    builder.addCase(actions.getCategories.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false
      state.errorMessage = action.payload
    })
  }
})

// export const { } = categoriesSlice.actions

export default categoriesSlice.reducer
