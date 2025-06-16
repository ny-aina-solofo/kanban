import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import boardService from "@/services/board/board.service";
import { BoardType } from "@/types";
import { RootState } from "./store";

export const fetchBoards = createAsyncThunk<
    BoardType[],
    undefined,
    {
      state: RootState;
      rejectValue: string;
    }
>(
    'boards/fetchBoards',
    async (_, { rejectWithValue}) => {
        try {
            const response = await boardService.getBoard();
            return response?.data || [];
        } catch (err) {
            if (err instanceof Error) return rejectWithValue(err.message);
            return rejectWithValue("Cannot fetch boards");
        }
    }
);