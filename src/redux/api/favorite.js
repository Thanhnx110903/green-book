import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { parseCookies } from 'nookies'

const favoriteApi = createApi({
  reducerPath: 'favorite',
  tagTypes: ['Favorite'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + '/favorite-book',
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
    getFavorite: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: '/'
        }
      },
      providesTags: ['Favorite']
    }),
    addFavorite: builder.mutation({
      query: (data) => {
        return {
          method: 'POST',
          url: `/add/${data}`
        }
      },
      invalidatesTags: ['Favorite']
    }),
    removeFavorite: builder.mutation({
      query: (data) => {
        return {
          method: 'DELETE',
          url: `/remove/${data}`
        }
      },
      invalidatesTags: ['Favorite']
    })
  })
})

export const { useAddFavoriteMutation, useGetFavoriteQuery, useRemoveFavoriteMutation } = favoriteApi
export default favoriteApi
