import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import searchSlice from "./slice/searchSlice";



export const store = configureStore({
    reducer: {
        search: searchSlice,
        auth: authSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch