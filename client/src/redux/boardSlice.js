import { createSlice } from "@reduxjs/toolkit";
import boards from "../data.json";

const initialState = {
    boards: boards.boards,
    activeBoardId : boards.boards[0].id_board,
    selectedBoard : null,
};

const boardSlice = createSlice({
    name : "boards", 
    initialState : initialState, 
    reducers : {
        setActiveBoard : (state,action) => {
            state.activeBoardId = action.payload;
        },
        setSelectedBoard : (state,action) => {
            state.selectedBoard = action.payload;
        }
        
    }
})

export const { setActiveBoard, setSelectedBoard } = boardSlice.actions;
export default boardSlice.reducer;



