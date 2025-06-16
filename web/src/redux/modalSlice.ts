import { ModalState,ModalKey } from "@/types/modal";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
  
const initialState : ModalState= {
    addBoardModal: { open: false },
    deleteBoardModal: { open: false },
    editBoardModal: { open : false },
    addTaskModal: { open: false },
    deleteTaskModal: { open: false },
};

const modalSlice = createSlice({
    name : "modal", 
    initialState : initialState, 
    reducers : {
        openModal: (state, action:PayloadAction<ModalKey>) => {
            // Close all modals and open the one that was clicked
            for (const modal in state) {
              state[modal as ModalKey].open = false;
            }
            state[action.payload].open = true;
        },
        closeModal: (state, action) => {
            for (const modal in state) {
                state[modal as ModalKey].open = false;
                // If they have a second property, set it to null / 0
                //   if (state[modal].task) {
                //     state[modal].task = null;
                //   }
                //   if (state[modal].boardID) {
                //     state[modal].boardID = 0;
                //   }
            }
        },
    }
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;



