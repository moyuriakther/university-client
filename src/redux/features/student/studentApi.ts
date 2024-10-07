import { apiSlice } from "../api/apiSlice";

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => ({
        url: `/student`,
        method: "GET",
      }),
      providesTags: ["student"],
    }),
    createStudent: builder.mutation({
        query: (data) => ({
          url: "/user/create-student",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["student"],
      }),
      updateCourseGrade: builder.mutation({
        query: ({ email, data }) => (
          
          {
            url: `/student/${email}/grade`,
            method: "PUT",
            body: data,
          }
        ),
        invalidatesTags: ["student"],
      }),
      updateEvent: builder.mutation({
        query: ({ email, data }) => (
          
          {
            url: `/student/${email}/event`,
            method: "PATCH",
            body: data,
          }
        ),
        invalidatesTags: ["student"],
      }),
  }),
});

export const { useGetAllStudentsQuery, useCreateStudentMutation, useUpdateCourseGradeMutation,  } = studentApi;
