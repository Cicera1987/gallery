import { configureStore } from "@reduxjs/toolkit";
import gallerySlice from "./features/gallerySlice";



export const store = configureStore({
  reducer: {
    gallery: gallerySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
