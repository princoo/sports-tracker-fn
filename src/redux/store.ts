import { combineReducers, configureStore } from '@reduxjs/toolkit';
import baseApi from '../core/baseApi';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { config } from '../core/config';
import { authApi } from '../pages/Authentication/redux/api';
import tokenReducer from './slices/tokenSlice';
import storage from "redux-persist/lib/storage";
const middleware = [baseApi.middleware];
const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  token: tokenReducer,
})
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: config.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [...reduxPersistActions],
      },
    }).concat(middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
