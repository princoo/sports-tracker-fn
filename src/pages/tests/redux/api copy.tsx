import toast from 'react-hot-toast';
import baseApi from '../../../core/baseApi';
import { DefaultResponse } from '../../../core/interface';
import { Test, TestPayload } from '../interface copy';
import { User } from "../../Users/interface";

interface DeleteTestPayload {
  testId: string;
}
export const siteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query<DefaultResponse<Test[]>, void>({
      query: () => ({
        url: 'test',
        method: 'GET',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error : any) {
          if (error?.error.status === 'FETCH_ERROR') {
            toast.error('Unable to reach the server.');
          } else if (error?.error?.status === 500) {
            // Handle server errors
            throw new Error('Failed to fetch sites due to server error.');
          } else if (error?.error) {
            toast.error(error.error.data.message || 'An error occurred'); 
          } else {
            toast.error('An unexpected error occurred');
          }
        }
      },
    }),
    createTest: builder.mutation<DefaultResponse, TestPayload>({
      query: (TestPayload) => ({
        url: 'test',
        method: 'POST',
        body: TestPayload,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.result.message);
        } catch ({ error }: any) {
          toast.error(error.data.message);
        }
      },
    }),
    updateTest: builder.mutation<
      DefaultResponse,
      { testId: string; TestPayload: TestPayload }
    >({
      query: ({ testId, TestPayload }) => ({
        url: `test/${testId}`,
        method: 'PATCH',
        body: TestPayload,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.result.message);
        } catch ({ error }: any) {
          toast.error(error.data.message);
        }
      },
    }),
    deleteTest: builder.mutation<DefaultResponse, DeleteTestPayload>({
      query: ({testId}) => ({
        url: `test/${testId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // toast.success(data.result.message);
        } catch ({ error }: any) {
          // toast.error(error.data.message);
        }
      },
    }),
  }),
});

export const {
useGetTestsQuery,
useCreateTestMutation,
useDeleteTestMutation,
useUpdateTestMutation
} = siteApi;
