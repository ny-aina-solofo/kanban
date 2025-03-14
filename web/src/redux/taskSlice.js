import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedTask : {},
};

const taskSlice = createSlice({
    name : "tasks", 
    initialState : initialState, 
    reducers : {
        setSelectedTask : (state,action) => {
            state.selectedTask = action.payload;
        }
    }
})

export const { setSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;



