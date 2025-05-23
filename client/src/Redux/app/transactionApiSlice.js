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
        })
    })
})

export const {useAddTransactionMutation, useGetTransactionsQuery} = transactionApiSlice