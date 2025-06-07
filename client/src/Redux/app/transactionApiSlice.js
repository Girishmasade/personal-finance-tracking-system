import { apiSlice } from "../api/apiSlice";
const TRANSACTION_URI = "transaction";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTransaction: builder.mutation({
      query: (data) => ({
        url: `${TRANSACTION_URI}/add-transaction`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    getTransactions: builder.query({
      query: () => ({
        url: `${TRANSACTION_URI}/get-transaction`,
        method: "GET",
        credentials: "include",
      }),
    }),

    updateTransactions: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `${TRANSACTION_URI}/update-transaction/${id}`,
        method: "PUT",
        body: { updateData },
        credentials: "include",
      }),
    }),
    deleteTransactions: builder.mutation({
      query: (id) => ({
        url: `${TRANSACTION_URI}/delete-transaction/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    uploadTransacationFile: builder.mutation({
      query: (body) => ({
        url: `${TRANSACTION_URI}/upload-transaction`,
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    getTrashTransactions: builder.query({
      query: () => ({
        url: `${TRANSACTION_URI}/get-deleted-transaction`,
        method: "GET",
        credentials: "include",
      }),
    }),
    permenantlyDeleteTransactions: builder.mutation({
      query: (id) => ({
        url: `${TRANSACTION_URI}/permenantly-delete-transaction/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    restoreTransaction: builder.mutation({
      query: (id) => ({
        url: `${TRANSACTION_URI}/restore-transaction/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
    restoreAllTransaction: builder.mutation({
      query: () => ({
        url: `${TRANSACTION_URI}/restore-all-transaction`,
        method: "PUT"
      }),
    }),
    deleteAllTransaction: builder.mutation({
      query: () => ({
        url: `${TRANSACTION_URI}/delete-all-transaction`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddTransactionMutation,
  useGetTransactionsQuery,
  useUpdateTransactionsMutation,
  useDeleteTransactionsMutation,
  useUploadTransacationFileMutation,
  useGetTrashTransactionsQuery,
  usePermenantlyDeleteTransactionsMutation,
  useRestoreTransactionMutation,
  useRestoreAllTransactionMutation,
  useDeleteAllTransactionMutation
} = transactionApiSlice;
