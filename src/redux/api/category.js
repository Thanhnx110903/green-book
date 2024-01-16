import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryApi = createApi({
  reducerPath: "categories",
  tagTypes: ["Categories"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_API + "/category",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/",
        };
      },
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
export default categoryApi;
