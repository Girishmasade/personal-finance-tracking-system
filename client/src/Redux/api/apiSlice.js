import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL + "/api",
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: [],
    endpoints: (builder) => ({})
 
})

// export const {useRegisterUserMutation} = apiSlice

//    endpoints: (builder) => ({
//     registerUser: builder.mutation({
//         query: (userData) => ({
//             url: '/user/register',
//             method: 'POST',
//             body: userData
//         })
//     })
// })