import { apiSlice } from "../api/apiSlice";

const AUTH_URL = "/user";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    forgetPassword: builder.mutation({
        query: (data) => ({
            url: `${AUTH_URL}/forget-password`,
            method: "POST",
            body: data,
            credentials: 'include'
        })
    }),

    getUserProfile: builder.query({
      query: (id) => ({
        url: `${AUTH_URL}/get-user-profile/${id}`,
        method: "GET",
        credentials: "include"
      })
    }),

    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        //...data to get the rest of the body from backend
        url: `${AUTH_URL}/update-profile/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useForgetPasswordMutation,
  useGetUserProfileQuery
} = authApiSlice;
