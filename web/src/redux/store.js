import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";
import modalReducer from "./modalSlice";
import taskReducer  from "./taskSlice";
import inputReducer  from "./inputSlice";


export const store = configureStore({
    reducer: {
        boards : boardReducer,
        tasks : taskReducer,
        modal : modalReducer,
        input : inputReducer
    },
});
