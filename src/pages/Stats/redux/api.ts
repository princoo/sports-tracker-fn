import toast from 'react-hot-toast';
import baseApi from '../../../core/baseApi';
import { DefaultResponse } from '../../../core/interface';
import { PlayerStat } from '../interface';

interface DeleteSitePayload {
  siteId: string;
}
export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessionPlayersStats: builder.query<
      DefaultResponse<PlayerStat[]>,
      { sessionId: string }
    >({
      query: ({ sessionId }) => ({
        url: `player-test/session/${sessionId}`,
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
  }),
});

export const { useGetSessionPlayersStatsQuery } = statsApi;
