import { createSlice } from "@reduxjs/toolkit";
import boards from "../data.json";

const initialState = {
    boards: boards.boards,
    activeBoardId : boards.boards[0].id_board
};

const boardSlice = createSlice({
    name : "boards", 
    initialState : initialState, 
    reducers : {
        setActiveBoard : (state,action) => {
            state.activeBoardId = action.payload;
        }
    }
})

export const { setActiveBoard } = boardSlice.actions;
export default boardSlice.reducer;



