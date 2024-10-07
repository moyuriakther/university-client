import { apiSlice } from "../api/apiSlice";

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => ({
        url: `/student`,
        method: "GET",
      }),
    //   providesTags: [],
    }),
    createStudent: builder.mutation({
        query: (data) => ({
          url: "/user/create-student",
          method: "POST",
          body: data,
        }),
        // invalidatesTags: ["Bikes"],
      }),
      updateCourseGrade: builder.mutation({
        query: ({ email, data }) => (
          // console.log(data, bikeId),
          {
            url: `/student/${email}/grade`,
            method: "PUT",
            body: data,
          }
        ),
        // invalidatesTags: ["Bikes"],
      }),
      updateEvent: builder.mutation({
        query: ({ email, data }) => (
          // console.log(data, bikeId),
          {
            url: `/student/${email}/event`,
            method: "PATCH",
            body: data,
          }
        ),
        // invalidatesTags: ["Bikes"],
      }),
  }),
});

export const { useGetAllStudentsQuery, useCreateStudentMutation, useUpdateCourseGradeMutation,  } = studentApi;
