import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: () => ({
        url: `/course`,
        method: "GET",
      }),
    //   providesTags: [],
    }),
    createCourse: builder.mutation({
        query: (data) => ({
          url: "/course",
          method: "POST",
          body: data,
        }),
        // invalidatesTags: ["Bikes"],
      }),
  }),
});

export const { useGetAllCourseQuery, useCreateCourseMutation } = courseApi;
