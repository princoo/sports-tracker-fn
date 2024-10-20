import { store } from "../redux/store";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from './config';
import { storage } from './storage';

const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: config.BACKEND_URL,
    // mode: 'no-cors',
    prepareHeaders: (headers) => {
      const token = storage.getToken();
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
export default baseApi;
