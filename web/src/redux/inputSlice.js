import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addColumn: { open : false } ,
    editDescription: { open : false },
    editTitle : { open : false },
    addSubtask : { open : false },
};

const inputSlice = createSlice({
    name : "input", 
    initialState : initialState, 
    reducers : {
        openInput: (state, action) => {
            // Close all modals and open the one that was clicked
            for (const input in state) {
              state[input].open = false;
            }
            state[action.payload].open = true;
        },
        closeInput: (state, action) => {
            for (const input in state) {
                state[input].open = false;
            }
        },
    }
})

export const { openInput, closeInput } = inputSlice.actions;
export default inputSlice.reducer;



