import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const addressApi = createApi({
  reducerPath: 'address',
  tagTypes: ['Address'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_ADDRESS
  }),
  endpoints: (builder) => ({
    getCity: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: `/master-data/province`,
          headers: {
            token: import.meta.env.VITE_TOKEN
          }
        }
      },
      providesTags: ['Address']
    }),
    getDistrict: builder.query({
      query: (providerId) => {
        return {
          method: 'GET',
          url: `/master-data/district?token=${import.meta.env.VITE_TOKEN}&province_id=${providerId}`,
          headers: {
            token: import.meta.env.VITE_TOKEN
          }
        }
      },
      providesTags: ['Address']
    }),
    getWard: builder.query({
      query: (district_id) => {
        return {
          method: 'GET',
          url: `/master-data/ward?district_id=${district_id}`,
          headers: {
            token: import.meta.env.VITE_TOKEN
          }
        }
      },
      providesTags: ['Address']
    }),
    getShippingOrder: builder.query({
      query: (data) => {
        const dataUp = {
          to_district: data,
          shop_id: import.meta.env.VITE_SHOP_ID,
          from_district: import.meta.env.VITE_FROM_DISTRICT
        }
        const queryString = new URLSearchParams(dataUp).toString()
        return {
          method: 'GET',
          url: `/v2/shipping-order/available-services?${queryString}`,
          headers: {
            token: import.meta.env.VITE_TOKEN
          }
        }
      },
      providesTags: ['Address']
    }),
    getShippingPrice: builder.query({
      query: (data) => {
        const dataUp = {
          to_district_id: data.district_id,
          shop_id: import.meta.env.VITE_SHOP_ID,
          from_district_id: import.meta.env.VITE_FROM_DISTRICT,
          height: 20,
          length: 20,
          weight: 2000,
          width: 20,
          service_id: data?.service_id,
          insurance_value: data?.insurance_value,
          to_ward_code: data?.to_ward_code
        }
        const queryString = new URLSearchParams(dataUp).toString()
        return {
          method: 'GET',
          url: `/v2/shipping-order/fee?${queryString}`,
          headers: {
            token: import.meta.env.VITE_TOKEN
          }
        }
      },
      providesTags: ['Address']
    })
  })
})

export const {
  useGetCityQuery,
  useGetDistrictQuery,
  useGetShippingOrderQuery,
  useGetShippingPriceQuery,
  useGetWardQuery
} = addressApi
export default addressApi
