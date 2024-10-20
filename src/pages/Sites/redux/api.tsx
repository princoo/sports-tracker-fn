import toast from 'react-hot-toast';
import baseApi from '../../../core/baseApi';
import { DefaultResponse } from '../../../core/interface';
import { Site, SitePayload } from '../interface';
import { User } from "../../Users/interface";


interface DeleteSitePayload {
  siteId: string;
}
export const siteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSites: builder.query<DefaultResponse<Site[]>, void>({
      query: () => ({
        url: 'site',
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
    getFreeCoaches: builder.query<DefaultResponse<User[]>, void>({
      query: () => ({
        url: 'site/free-coach',
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
    createSite: builder.mutation<DefaultResponse, SitePayload>({
      query: (SitePayload) => ({
        url: 'site',
        method: 'POST',
        body: SitePayload,
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
    addCoachOnSite: builder.mutation<DefaultResponse, {userId: string, siteId: string}>({
      query: (SitePayload) => ({
        url: 'coach-on-site',
        method: 'POST',
        body: SitePayload,
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
    updateSite: builder.mutation<
      DefaultResponse,
      { siteId: string; SitePayload: SitePayload }
    >({
      query: ({ siteId, SitePayload }) => ({
        url: `site/${siteId}`,
        method: 'PATCH',
        body: SitePayload,
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
    deleteSite: builder.mutation<DefaultResponse, DeleteSitePayload>({
      query: (siteId) => ({
        url: `site/${siteId.siteId}`,
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
    removeCoach: builder.mutation<DefaultResponse, {userId: string}>({
      query: ({userId}) => ({
        url: `coach-on-site/${userId}`,
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
  useGetSitesQuery,
  useGetFreeCoachesQuery,
  useUpdateSiteMutation,
  useCreateSiteMutation,
  useDeleteSiteMutation,
  useAddCoachOnSiteMutation,
  useRemoveCoachMutation,
} = siteApi;
