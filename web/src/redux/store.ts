import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";
import modalReducer from "./modalSlice";
import inputReducer  from "./inputSlice";


export const store = configureStore({
    reducer: {
        boards : boardReducer,
        modal : modalReducer,
        input : inputReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

