import { configureStore } from "@reduxjs/toolkit";
import GalleryReducer from "./features/gallerySlice";
import CartReducer from "./features/CartSlice";
import TaskReducer from "./features/taskSlice";



export const store = configureStore({
  reducer: {
    gallery: GalleryReducer,
    cart: CartReducer,
    task: TaskReducer


  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
