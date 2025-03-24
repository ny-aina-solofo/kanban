import { createSlice,nanoid } from "@reduxjs/toolkit";
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
        },
        addBoard : (state, action) => {
            const newID = nanoid();
            const boardName = action.payload;
            const newBoard = {
                id_board:newID,
                board_name:boardName,
                column:[]
            };
            state.boards.push(newBoard);
            state.activeBoardId = newID;
        },
        deleteBoard: (state, action) => {
            const id_board = action.payload;
            state.boards = state.boards.filter((board) => board.id_board !== id_board);
            state.activeBoardId = initialState.activeBoardId;
        },
        editBoard: (state, action) => {
            const { id_board, boardName } = action.payload;
            const board = state.boards.find((board) => board.id_board === id_board);
            if (board) {
              board.board_name = boardName;
            //   board.columns = columns;
            }
        },
        
    }
})

export const { 
    setActiveBoard, 
    setSelectedBoard,
    addBoard,
    deleteBoard,
    editBoard,
} = boardSlice.actions;
export default boardSlice.reducer;



