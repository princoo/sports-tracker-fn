import toast from 'react-hot-toast';
import baseApi from '../../../core/baseApi';
import { DefaultResponse } from '../../../core/interface';
import { Role, User } from "../interface";
// import { LoginPayload, LoginResponse, SignUpPayload } from './interface';
// import { setToken } from '../../../redux/slices/tokenSlice';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<DefaultResponse<User[]>, void>({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
        } catch ({ error }: any) {
          toast.error(error.data.message);
        }
      },
    }),
    getRoles: builder.query<DefaultResponse<Role[]>, void>({
      query: () => ({
        url: 'roles',
        method: 'GET',
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
        } catch ({ error }: any) {
          toast.error(error.data.message);
        }
      },
    }),
    changeUserRole: builder.mutation<DefaultResponse, {userId: string | null, roleId: string}>({
      query: ({userId, roleId}) => ({
        url: `users/role/${userId}`,
        method: 'PATCH',
        body: {roleId},
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

export const { useGetUsersQuery, useChangeUserRoleMutation, useGetRolesQuery } = userApi;
