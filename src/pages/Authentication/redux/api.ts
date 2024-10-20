import toast from 'react-hot-toast';
import baseApi from '../../../core/baseApi';
import { DefaultResponse } from '../../../core/interface';
import { LoginPayload, LoginResponse, SignUpPayload } from './interface';
import { setToken } from "../../../redux/slices/tokenSlice";
import { storage } from "../../../core/storage";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<DefaultResponse<LoginResponse>, LoginPayload>({
      query: (userData) => ({
        url: 'auth/login',
        method: 'POST',
        body: userData,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.result.data.access_token))
          storage.setToken(data.result.data.access_token)
          toast.success(data.result.message);
        } catch ({ error }: any) {
          toast.error(error.data.message);
        }
      },
    }),
    signup: builder.mutation<DefaultResponse, SignUpPayload>({
      query: (userData) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userData,
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
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
