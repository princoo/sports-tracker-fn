import toast from 'react-hot-toast';
import baseApi from '../../../core/baseApi';
import { DefaultResponse } from '../../../core/interface';
import { Player, PlayerPayload } from '../interface';
import { User } from '../../Users/interface';

interface DeleteSitePayload {
  siteId: string;
}
export const siteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlayers: builder.query<DefaultResponse<Player[]>, void>({
      query: () => ({
        url: 'players',
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
    getAllPlayersBySite: builder.query<DefaultResponse<Player[]>, {siteId: string | null}>({
      query: ({siteId}) => ({
        url: `players/${siteId}`,
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
    getSitePlayers: builder.query<DefaultResponse<Player[]>, { siteId: string }>({
      query: ({ siteId }) => ({
        url: `players/${siteId}`,
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
    getSinglePlayers: builder.query<
      DefaultResponse<Player>,
      { playerId: string }
    >({
      query: ({ playerId }) => ({
        url: `players/${playerId}`,
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
    createPlayer: builder.mutation<
      DefaultResponse,
      { siteId: string; PlayerPayload: PlayerPayload }
    >({
      query: ({ siteId, PlayerPayload }) => ({
        url: `players/${siteId}`,
        method: 'POST',
        body: PlayerPayload,
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
    updatePlayer: builder.mutation<
      DefaultResponse,
      { playerId: string; playerPayload: PlayerPayload }
    >({
      query: ({ playerId, playerPayload }) => ({
        url: `players/${playerId}`,
        method: 'PATCH',
        body: playerPayload,
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
    deletePlayer: builder.mutation<DefaultResponse, { playerId: string }>({
      query: ({ playerId }) => ({
        url: `players/${playerId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (siteId, { queryFulfilled }) => {
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
  useGetAllPlayersQuery,
  useGetSinglePlayersQuery,
  useGetSitePlayersQuery,
  useDeletePlayerMutation,
  useUpdatePlayerMutation,
  useCreatePlayerMutation,
  useGetAllPlayersBySiteQuery
} = siteApi;
