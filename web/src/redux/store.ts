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
