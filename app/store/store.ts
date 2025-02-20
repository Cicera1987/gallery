import { configureStore } from "@reduxjs/toolkit";
import GalleryReducer from "./features/gallerySlice";
import CartReducer from "./features/CartSlice";
import TaskReducer from "./features/taskSlice";
import { pokemonApi } from "../services/pokemons";
import { setupListeners } from "@reduxjs/toolkit/query";



export const store = configureStore({
  reducer: {
    gallery: GalleryReducer,
    cart: CartReducer,
    task: TaskReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch)
