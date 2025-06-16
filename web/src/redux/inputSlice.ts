import { InputKey, InputState } from "@/types/input";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InputState = {
  addColumn: { open: false },
  editDescription: { open: false },
  editTitle: { open: false },
  addSubtask: { open: false },
};


const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    openInput: (state, action: PayloadAction<InputKey>) => {
      // Fermer tous les inputs
      for (const input in state) {
        state[input as InputKey].open = false;
      }
      // Ouvrir l'input ciblé
      state[action.payload].open = true;
    },
    closeInput: (state) => {
      for (const input in state) {
        state[input as InputKey].open = false;
      }
    },
  },
});

export const { openInput, closeInput } = inputSlice.actions;
export default inputSlice.reducer;
