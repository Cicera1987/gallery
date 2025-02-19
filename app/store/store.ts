import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./features/gallerySlice";
import cartReducer from "./features/CartSlice";



export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    cart: cartReducer,


  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
