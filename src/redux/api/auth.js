import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
  reducerPath: 'auth',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: '/login',
          body: data
        }
      },
      providesTags: ['Auth']
    }),
    register: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: '/register',
          body: data
        }
      },
      providesTags: ['Auth']
    }),
    loginGoogle: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: '/login/google'
        }
      },
      providesTags: ['Auth']
    }),

    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: '/forgot-password',
          body: data
        }
      },
      providesTags: ['Auth']
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: '/reset-password',
          body: data
        }
      },
      providesTags: ['Auth']
    }),
    sendOtp: builder.mutation({
      query: () => {
        return {
          method: 'POST',
          url: '/send-otp'
        }
      },
      providesTags: ['Auth']
    }),
    vetifyAccout: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: `/vertify-otp?otp=${data?.otp}`,
          body: data
        }
      },
      providesTags: ['Auth']
    })
  })
})

export const {
  useForgotPasswordMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useSignInMutation,
  useSendOtpMutation,
  useVetifyAccoutMutation,
  useLoginGoogleQuery
} = authApi
export default authApi
