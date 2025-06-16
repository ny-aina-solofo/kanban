import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import boardsData from "../data.json";
import { BoardType,TaskType,SubtaskType,ColumnType, BoardState } from "@/types";
import { fetchBoards } from "./fetchBoards";

const initialState: BoardState = {
    // boards: [{id_board: -1, board_name: "",column: []}],
    boards: boardsData.boards,
    // activeBoardId: null,
    activeBoardId: boardsData.boards[0].id_board,
    selectedBoard: null,
    selectedTask: {},
    status: "idle",
    error: null,
};

const boardSlice = createSlice({
    name: "boards",
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(fetchBoards.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(fetchBoards.fulfilled, (state, action) => {
            state.status = "received";
            state.boards = action.payload;
            if (state.activeBoardId === null && state.boards.length > 0) {
                state.activeBoardId = state.boards[0].id_board;
            }
          })
          .addCase(fetchBoards.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload || "Cannot load data";
          });
      },
    reducers: {
        setActiveBoard: (state, action: PayloadAction<number | null>) => {
            state.activeBoardId = action.payload;
        },
        setSelectedBoard: (state, action: PayloadAction<BoardType | null>) => {
            state.selectedBoard = action.payload;
        },
        addBoard: (state, action: PayloadAction<string>) => {
            const newID = Date.now();
            const newBoard: BoardType = {
                id_board: newID,
                board_name: action.payload,
                column: [],
            };
            state.boards.push(newBoard);
            state.activeBoardId = newID;
        },
        deleteBoard: (state, action: PayloadAction<number>) => {
            const id_board = action.payload;
            const updatedBoard = state.boards.filter((board:BoardType) => board.id_board !== id_board);
            state.boards = updatedBoard;
            state.activeBoardId = updatedBoard.length > 0 ? updatedBoard[0].id_board : null;
        },
        editBoard: (state, action: PayloadAction<{ id_board: number; boardName: string; columns: ColumnType[] }>) => {
            const { id_board, boardName, columns } = action.payload;
            const board = state.boards.find((board:BoardType) => board.id_board === id_board);
            if (board) {
                board.board_name = boardName;
                board.column = columns;
            }
        },

        // Column
        addColumn: (state, action: PayloadAction<{ id_board: number | null; columnName: string }>) => {
            const { id_board, columnName } = action.payload;
            const newID = Date.now();
            const board = state.boards.find((board:BoardType) => board.id_board === id_board);
            const column = board?.column || [];
            const newColumn: ColumnType = {
                id_column: newID,
                column_name: columnName,
                id_board: id_board,
                tasks: [],
            };
            column.push(newColumn);
        },

        // Task
        setSelectedTask: (state, action: PayloadAction<TaskType | Record<string, any>>) => {
            state.selectedTask = action.payload;
            localStorage.setItem("selectedTask", JSON.stringify(action.payload));
        },
        addTask: (state, action: PayloadAction<{ taskName: string; description: string; id_column: number; subtasks: string[]; id_board: number | null }>) => {
            const { taskName, description, id_column, subtasks, id_board } = action.payload;
            const newID = Date.now();
            const board = state.boards.find((board:BoardType) => board.id_board === id_board);
            const column = board?.column.find((col:ColumnType) => col.id_column === id_column);
            const newSubtasks : SubtaskType[] = subtasks.map((name) => ({
                id_subtask: Date.now(),
                libelle: name,
                done: false,
                id_task: newID,
            }));
            const newTask: TaskType = {
                id_task: newID,
                title: taskName,
                description,
                id_column,
                subtasks: newSubtasks,
            };
            if (column) column.tasks = [...(column.tasks || []), newTask];
        },
        deleteTask: (state, action: PayloadAction<{ task: TaskType | Record<string, any>; activeBoardId: number | null }>) => {
            const { task, activeBoardId } = action.payload;
            const board = state.boards.find((b:BoardType) => b.id_board === activeBoardId);
            const column = board?.column.find((col:ColumnType) => col.id_column === task.id_column);
            if (column) column.tasks = column.tasks.filter((t:TaskType) => t.id_task !== task.id_task);
        },
        editDescription: (state, action: PayloadAction<{ description: string; task: TaskType | Record<string, any>; activeBoardId: number | null }>) => {
            const { description, task, activeBoardId } = action.payload;
            const board = state.boards.find((b:BoardType) => b.id_board === activeBoardId);
            const column = board?.column.find((col:ColumnType) => col.id_column === task.id_column);
            if (column) {
                column.tasks = column.tasks.map((t:TaskType) =>
                    t.id_task !== task.id_task ? t : { ...t, description }
                );
            }
            if (state.selectedTask.id_task === task.id_task) {
                state.selectedTask.description = description;
            }
        },
        editTitle: (state, action: PayloadAction<{ title: string; task: TaskType | Record<string, any>; activeBoardId: number | null }>) => {
            const { title, task, activeBoardId } = action.payload;
            const board = state.boards.find((b:BoardType) => b.id_board === activeBoardId);
            const column = board?.column.find((col:ColumnType) => col.id_column === task.id_column);
            if (column) {
                column.tasks = column.tasks.map((t:TaskType) =>
                    t.id_task !== task.id_task ? t : { ...t, title }
                );
            }
            if (state.selectedTask.id_task === task.id_task) {
                state.selectedTask.title = title;
            }
        },
        changeTaskColumn: (state, action: PayloadAction<{ id_board: number | null; oldColumnId: number; newColumnId: number; id_task: number }>) => {
            const { id_board, oldColumnId, newColumnId, id_task } = action.payload;
            const board = state.boards.find((b:BoardType) => b.id_board === id_board);
            const oldColumn = board?.column.find((c:ColumnType) => c.id_column === oldColumnId);
            const newColumn = board?.column.find((c:ColumnType) => c.id_column === newColumnId);
            const task = oldColumn?.tasks.find((t:TaskType) => t.id_task === id_task);
            if (oldColumn && newColumn && task) {
                oldColumn.tasks = oldColumn.tasks.filter((t:TaskType) => t.id_task !== id_task);
                task.id_column = newColumnId;
                newColumn.tasks = [...(newColumn.tasks || []), task];
            }
        },
        moveTask: (
            state,
            action: PayloadAction<{
                boardId: string;
                oldColumnId: string;
                nextColumnId: string; 
                taskId: string;
                index?: any;
            }>
        ) => {
            const { boardId, nextColumnId, oldColumnId, taskId, index } = action.payload;
        
            const board = state.boards.find((b:BoardType) => b.id_board.toString() === boardId);
        
            const oldColumn = board.column.find((col:ColumnType) => col.id_column.toString() === oldColumnId);
        
            const nextColumn = nextColumnId
                ? board.column.find((col:ColumnType) => col.id_column.toString() === nextColumnId)
                : oldColumn;
    

            if (oldColumn && nextColumn) {
                const taskToMove = oldColumn.tasks.find((task:any) => task.id_task.toString() === taskId);
                
                taskToMove.id_column = nextColumn.id_column;
        
                // --- Gérer la suppression de l'ancienne colonne ---
                oldColumn.tasks = oldColumn.tasks.filter(
                    (task:any) => task.id_task.toString() !== taskId
                );
        
                // --- Gérer l'ajout à la nouvelle colonne ---
                if (nextColumn.tasks) {
                    if (index !== undefined) {
                        nextColumn.tasks.splice(index, 0, taskToMove); // Insérer à l'index spécifié
                    } else {
                        nextColumn.tasks.push(taskToMove); // Ajouter à la fin
                    }
                } else {
                    nextColumn.tasks = [taskToMove]; // Si la colonne n'avait pas de tâches, en créer un nouveau tableau
                }
            }
        },

        // Subtask
        addSubtask: (state, action: PayloadAction<{ libelle: string; tasks: TaskType | Record<string, any>; activeBoardId: number | null }>) => {
            const { libelle, tasks, activeBoardId } = action.payload;
            const board = state.boards.find((b:BoardType) => b.id_board === activeBoardId);
            const column = board?.column.find((col:ColumnType) => col.id_column === tasks.id_column);
            const task = column?.tasks.find((t:TaskType) => t.id_task === tasks.id_task);
            const newSubtask: SubtaskType = {
                id_subtask: Date.now(),
                libelle,
                done: false,
                id_task: task!.id_task,
            };
            if (task) task.subtasks = [...(task.subtasks || []), newSubtask];

            if (state.selectedTask.id_task === tasks.id_task) {
                state.selectedTask.subtasks = [...(state.selectedTask.subtasks || []), newSubtask];
            }
        },
        updateCheckbox: (state, action: PayloadAction<{ id_subtask: number; tasks: TaskType | Record<string, any>; activeBoardId: number | null }>) => {
            const { id_subtask, tasks, activeBoardId } = action.payload;
            const board = state.boards.find((b:BoardType) => b.id_board === activeBoardId);
            const column = board?.column.find((col:ColumnType) => col.id_column === tasks.id_column);
            const task = column?.tasks.find((t:TaskType) => t.id_task === tasks.id_task);
            const subtask = task?.subtasks.find((s:SubtaskType) => s.id_subtask === id_subtask);
            if (subtask) subtask.done = !subtask.done;

            if (state.selectedTask.id_task === tasks.id_task) {
                const selectedSubtask = state.selectedTask.subtasks.find((s: SubtaskType) => s.id_subtask === id_subtask);
                if (selectedSubtask) selectedSubtask.done = !selectedSubtask.done;
            }
        },
        deleteSubtask: (state, action: PayloadAction<{ id_subtask: number; tasks: TaskType | Record<string, any>; activeBoardId: number | null }>) => {
            const { id_subtask, tasks, activeBoardId } = action.payload;
            const board = state.boards.find((b:BoardType) => b.id_board === activeBoardId);
            const column = board?.column.find((col:ColumnType) => col.id_column === tasks.id_column);
            const task = column?.tasks.find((t:TaskType) => t.id_task === tasks.id_task);
            if (task) task.subtasks = task.subtasks.filter((s:SubtaskType) => s.id_subtask !== id_subtask);

            if (state.selectedTask.id_task === tasks.id_task) {
                state.selectedTask.subtasks = state.selectedTask.subtasks.filter((s: SubtaskType) => s.id_subtask !== id_subtask);
            }
        },
    }
});

export const {
    setActiveBoard,
    setSelectedBoard,
    addBoard,
    deleteBoard,
    editBoard,
    addColumn,
    setSelectedTask,
    addTask,
    deleteTask,
    editDescription,
    editTitle,
    addSubtask,
    updateCheckbox,
    deleteSubtask,
    changeTaskColumn,
    moveTask
} = boardSlice.actions;

export default boardSlice.reducer;
