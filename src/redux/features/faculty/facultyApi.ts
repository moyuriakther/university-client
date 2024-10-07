import { apiSlice } from "../api/apiSlice";

export const facultyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaculty: builder.query({
      query: () => ({
        url: `/faculty`,
        method: "GET",
      }),
      providesTags: ["faculty"],
    }),
    createFaculty: builder.mutation({
        query: (data) => ({
          url: "/user/create-faculty",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["faculty"],
      }),
  }),
});

export const { useCreateFacultyMutation, useGetAllFacultyQuery } = facultyApi;
