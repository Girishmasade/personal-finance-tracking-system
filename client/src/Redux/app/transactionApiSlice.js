import { apiSlice } from "../api/apiSlice";
const TRANSACTION_URI = 'transaction'

export const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addTransaction: builder.mutation({
            query: (data) => ({
                url: `${TRANSACTION_URI}/add-transaction`,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }), 

        getTransactions: builder.query({
            query: () => ({
                url: `${TRANSACTION_URI}/get-transaction`,
                method: 'GET',
                credentials: 'include'
            })
        }),

        updateTransactions: builder.mutation({
            query: ({id, updateData}) => ({
                url: `${TRANSACTION_URI}/update-transaction/${id}`,
                method: 'PUT',
                body: {updateData},
                credentials: 'include'
            })
        }),
        deleteTransactions: builder.mutation({
            query: (id) => ({
                url: `${TRANSACTION_URI}/delete-transaction/${id}`,
                method: 'DELETE',
                credentials: 'include'
            })
        })
    })
})

export const {useAddTransactionMutation, useGetTransactionsQuery, useUpdateTransactionsMutation, useDeleteTransactionsMutation} = transactionApiSlice