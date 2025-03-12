import toast from 'react-hot-toast';
import baseApi from '../../../core/baseApi';
import { DefaultResponse } from '../../../core/interface';
import { Session, SessionPayload } from "../interface";
import { ActiveSession } from "../../PlayerTests/interface";

interface DeleteSitePayload {
  sessionId: string;
}
export const sessionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query<DefaultResponse<Session[]>, void>({
      query: () => ({
        url: 'test-session',
        method: 'GET',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // throw new Error('Failed to fetch sites due to server error.');
        } catch (error : any) {
          // Check for FETCH_ERROR
          if (error?.error.status === 'FETCH_ERROR') {
            // Handle network errors (e.g., backend is down)
            // toast.error('Unable to reach the server.');
            throw new Error('Unable to reach the server.');

          } else if (error?.error?.status === 500) {
            // Handle server errors
            throw new Error('Failed to fetch sessions due to server error.');
          } else if (error?.error) {
            // Handle other error statuses with a toast notification
            toast.error(error.error.data.message || 'An error occurred'); 
          } else {
            // Handle unexpected errors
            toast.error('An unexpected error occurred');
          }
        }
      },
    }),
    getActiveSessions: builder.query<DefaultResponse<ActiveSession>, void>({
      query: () => ({
        url: 'test-session/session/active',
        method: 'GET',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // throw new Error('Failed to fetch sites due to server error.');
        } catch (error : any) {
          // Check for FETCH_ERROR
          if (error?.error.status === 'FETCH_ERROR') {
            // Handle network errors (e.g., backend is down)
            // toast.error('Unable to reach the server.');
            throw new Error('Unable to reach the server.');

          } else if (error?.error?.status === 500) {
            // Handle server errors
            throw new Error('Failed to fetch sessions due to server error.');
          } else if (error?.error) {
            // Handle other error statuses with a toast notification
            toast.error(error.error.data.message || 'An error occurred'); 
          } else {
            // Handle unexpected errors
            toast.error('An unexpected error occurred');
          }
        }
      },
    }),
    createSession: builder.mutation<DefaultResponse, SessionPayload>({
      query: (SessionPayload) => ({
        url: 'test-session',
        method: 'POST',
        body: SessionPayload,
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
    updateSession: builder.mutation<
      DefaultResponse,
      { sessionId: string; SessionPayload: SessionPayload }
    >({
      query: ({ sessionId, SessionPayload }) => ({
        url: `test-session/${sessionId}`,
        method: 'PATCH',
        body: SessionPayload,
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
    deleteSession: builder.mutation<DefaultResponse, DeleteSitePayload>({
      query: (sessionId) => ({
        url: `test-session/${sessionId.sessionId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (siteId, { queryFulfilled }) => {
        try {
          console.log(siteId);
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
  useGetSessionsQuery,
  useUpdateSessionMutation,
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useGetActiveSessionsQuery
} = sessionsApi;
