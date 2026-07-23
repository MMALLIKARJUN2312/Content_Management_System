import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { standardsApi } from './api/standardsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [standardsApi.reducerPath]: standardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(standardsApi.middleware),
});
