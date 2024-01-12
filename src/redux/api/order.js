import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../../config/cookies'
import { parseCookies } from 'nookies'

const orderApi = createApi({
  reducerPath: 'order',
  tagTypes: ['Order'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + '/order',
    prepareHeaders: (headers) => {
      const cookies = parseCookies()
      headers.set('Authorization', `Bearer ${JSON.parse(cookies['userInfor'])?.access_token}`)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (data) => {
        const queryParams = []
        if (data?.date) {
          queryParams.push(`create_at=${data.date}`)
        }
        if (data?.status) {
          queryParams.push(`status=${data.status}`)
        }
        if (data?.payment) {
          queryParams.push(`payment=${data.payment}`)
        }
        return {
          method: 'GET',
          url: `/${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`
        }
      },
      providesTags: ['Order']
    }),
    getOrder: builder.query({
      query: (id) => {
        return {
          method: 'GET',
          url: `/order-detail/${id}`
        }
      },
      providesTags: ['Order']
    }),
    updateOrder: builder.mutation({
      query: (data) => {
        return {
          method: 'PUT',
          url: `/update-order/${data?.id}`,
          data: data
        }
      },
      invalidatesTags: ['Order']
    }),
    cancelOrder: builder.mutation({
      query: (id) => {
        return {
          method: 'PUT',
          url: `/cancel-order/${id}`
        }
      },
      invalidatesTags: ['Order']
    }),
    paymentMomo: builder.mutation({
      query: (id) => {
        return {
          method: 'GET',
          url: `${import.meta.env.VITE_URL_API}/momo_payment/${id}`
        }
      },
      invalidatesTags: ['Order']
    })
  })
})

export const {
  useCancelOrderMutation,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useGetOrdersQuery,
  usePaymentMomoMutation
} = orderApi
export default orderApi
