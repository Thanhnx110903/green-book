import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncAction'
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn

      state.token = action.payload.token
    },
    logout: (state,action) => {
      state.isLoggedIn = false
      state.token = null
    }
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false
      state.current = action.payload
    })
    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false
      state.current = null // .message
    })
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
