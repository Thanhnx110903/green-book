import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { parseCookies } from 'nookies'

const userApi = createApi({
  reducerPath: 'user',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API,
    prepareHeaders: (headers) => {
      const cookies = parseCookies()
      headers.set('Authorization', `Bearer ${JSON.parse(cookies['userInfor'])?.access_token}`)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: '/show-profile'
        }
      },
      providesTags: ['User']
    }),
    getMyVoucher: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: '/user-coupon'
        }
      },
      providesTags: ['User']
    }),
    getVoucher: builder.mutation({
      query: (id) => {
        return {
          method: 'POST',
          url: `/coupon/get-coupon/${id}`
        }
      },
      providesTags: ['User']
    }),
    getVoucherByFilter: builder.query({
      query: (data) => {
        const queryParams = []
        if (data?.type) {
          queryParams.push(`type=${data.type}`)
        }
        if (data?.name) {
          queryParams.push(`name=${data.name}`)
        }
        return {
          method: 'GET',
          url: `/user-coupon/filter${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`
        }
      },
      providesTags: ['User']
    }),
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: '/update-profile',
          body: data
        }
      },
      invalidatesTags: ['User']
    }),
    updatePassword: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: '/update-password',
          body: data
        }
      },
      invalidatesTags: ['User']
    }),
    logOut: builder.query({
      query: (data) => {
        return {
          method: 'GET',
          url: '/logout',
          body: data
        }
      },
      providesTags: ['User']
    }),
    getRating: builder.query({
      query: (data) => {
        const queryParams = []
        if (data?.rating) {
          queryParams.push(`rating=${data.rating}`)
        }
        if (data?.page) {
          queryParams.push(`page=${data.page}`)
        }
        return {
          method: 'GET',
          url: `${import.meta.env.VITE_URL_API}/review/show/${data.id}${
            queryParams.length > 0 ? '?' + queryParams.join('&') : ''
          }`
        }
      },
      providesTags: ['Books']
    }),
    addRating: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: `${import.meta.env.VITE_URL_API}/review/add/${data.id}`,
          body: data?.data
        }
      },
      invalidatesTags: ['Books']
    })
  })
})

export const {
  useGetProfileQuery,
  useLogOutQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetVoucherMutation,
  useGetMyVoucherQuery,
  useGetVoucherByFilterQuery,
  useAddRatingMutation,
  useGetRatingQuery
} = userApi
export default userApi
