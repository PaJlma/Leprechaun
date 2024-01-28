import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import { videosApi } from "./services/videos.api";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(videosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
