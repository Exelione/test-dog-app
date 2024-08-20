import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./cardsSlice";
import { dogApi } from "../services/api";

export const store = configureStore({
    reducer: {
        cards: cardsReducer,
        [dogApi.reducerPath]: dogApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(dogApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;