import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { parseCookies } from 'nookies'

const cartApi = createApi({
  reducerPath: 'cart',
  tagTypes: ['Cart'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + '/cart',
    prepareHeaders: (headers) => {
      const cookies = parseCookies()
      headers.set(
        'Authorization',
        `Bearer ${cookies?.userInfor ? JSON?.parse(cookies['userInfor'])?.access_token : ''}`
      )
      return headers
    }
  }),

  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: `/`
        }
      },
      providesTags: ['Cart']
    }),
    addCart: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: `/add/${data?.id}`,
          body: data?.data
        }
      },
      invalidatesTags: ['Cart']
    }),
    createOrder: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: `/create-order`,
          body: data
        }
      },
      invalidatesTags: ['Cart']
    }),
    updateCart: builder.mutation({
      query: (data) => {
        return {
          method: 'PUT',
          url: `/update/${data?.id}`,
          body: data?.data
        }
      },
      invalidatesTags: ['Cart']
    }),
    removeCart: builder.mutation({
      query: (id) => {
        return {
          method: 'DELETE',
          url: `/remove/${id}`
        }
      },
      invalidatesTags: ['Cart']
    }),
    removeAllCart: builder.mutation({
      query: () => {
        return {
          method: 'DELETE',
          url: `/remove-all`
        }
      },
      invalidatesTags: ['Cart']
    })
  })
})

export const {
  useAddCartMutation,
  useGetCartQuery,
  useRemoveAllCartMutation,
  useRemoveCartMutation,
  useUpdateCartMutation,
  useCreateOrderMutation
} = cartApi
export default cartApi
