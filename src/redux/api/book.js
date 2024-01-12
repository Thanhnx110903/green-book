import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { cookies } from '../../config/cookies'
import { parseCookies } from 'nookies'

const bookApi = createApi({
  reducerPath: 'Books',
  tagTypes: ['Books'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + '/book'
  }),
  prepareHeaders: (headers) => {
    const cookies = parseCookies()
    console.log(JSON.parse(cookies['userInfor'])?.access_token)

    headers.set('Authorization', `Bearer ${JSON.parse(cookies['userInfor'])?.access_token}`)
    return headers
  },
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: '/'
        }
      },
      providesTags: ['Books']
    }),
    getTopBooks: builder.query({
      query: () => {
        return {
          method: 'GET',
          url: '/top-book'
        }
      },
      providesTags: ['Books']
    }),
    getRelatedBook: builder.query({
      query: (id) => {
        return {
          method: 'GET',
          url: `/related-book/${id}`
        }
      },
      providesTags: ['Books']
    }),
    getDetailBook: builder.query({
      query: (id) => {
        return {
          method: 'GET',
          url: `/show/${id}`
        }
      },
      providesTags: ['Books']
    }),
    getBookByQuery: builder.query({
      query: (data) => {
        const queryParams = []
        if (data?.sort_name) {
          queryParams.push(`sort_name=${data.sort_name}`)
        }
        if (data?.category_id) {
          queryParams.push(`category_slug=${data.category_id}`)
        }
        if (data?.sort_price) {
          queryParams.push(`sort_price=${data.sort_price}`)
        }
        if (data?.max) {
          queryParams.push(`min_price=0`)
          queryParams.push(`max_price=${+data.max * 1000}`)
        }
        if (data?.sort_date) {
          queryParams.push(`min_price=${data.max_price}`)
        }
        if (data?.page) {
          queryParams.push(`page=${data.page}`)
        }
        if (data?.name) {
          queryParams.push(`name=${data.name}`)
        }
        if (data?.author) {
          queryParams.push(`author=${data.author}`)
        }
        if (data?.published_company) {
          queryParams.push(`published_company=${data.published_company}`)
        }
        return {
          method: 'GET',
          url: `/search-and-filter${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`
        }
      },
      providesTags: ['Books']
    })
  })
})

export const {
  useGetBooksQuery,
  useGetDetailBookQuery,
  useGetRelatedBookQuery,
  useGetTopBooksQuery,
  useGetBookByQueryQuery
} = bookApi
export default bookApi
