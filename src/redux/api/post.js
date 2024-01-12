import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postApi = createApi({
  reducerPath: "post",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + "/post",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/",
        };
      },
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/show/${id}`,
        };
      },
      providesTags: ["Post"],
    }),
    getPostByQuery: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/search`,
        };
      },
      providesTags: ["Post"],
    }),
    getRelatedPost: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/related-post/${id}`,
        };
      },
      providesTags: ["Post"],
    }),
    getTopPost: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/top-post`,
        };
      },
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetPostByQueryQuery, useGetPostQuery, useGetPostsQuery, useGetRelatedPostQuery, useGetTopPostQuery} = postApi;
export default postApi;
