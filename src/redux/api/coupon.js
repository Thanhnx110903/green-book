import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { parseCookies } from 'nookies'

const couponApi = createApi({
  reducerPath: 'coupon',
  tagTypes: ['Coupon'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + '/coupon',
    prepareHeaders: (headers) => {
      const cookies = parseCookies()
      headers.set('Authorization', `Bearer ${JSON.parse(cookies['userInfor'])?.access_token}`)
      return headers
    }
  }),
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: '/'
        }
      },
      providesTags: ['Coupon']
    }),
    getDetailCoupon: builder.query({
      query: (id) => {
        return {
          method: 'GET',
          url: `/show/${id}`
        }
      },
      providesTags: ['Coupon']
    })
  })
})

export const { useGetCouponsQuery, useGetDetailCouponQuery } = couponApi
export default couponApi
