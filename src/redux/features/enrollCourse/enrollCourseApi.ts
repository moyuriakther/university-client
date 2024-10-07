import { apiSlice } from "../api/apiSlice";

export const enrollCourseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEnrollCourse: builder.query({
      query: () => ({
        url: `/enrolled-course`,
        method: "GET",
      }),
    //   providesTags: [],
    }),
    createEnrollCourse: builder.mutation({
        query: (data) => ({
          url: "/enrolled-course",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["course", "student", "faculty"],
      }),
  }),
});

export const { useGetAllEnrollCourseQuery, useCreateEnrollCourseMutation } = enrollCourseApi;
