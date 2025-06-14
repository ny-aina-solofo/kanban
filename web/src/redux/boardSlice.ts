import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import boardsData from "../data.json";
import { arrayMove } from "@dnd-kit/sortable";
import { BoardType,TaskType,SubtaskType,ColumnType } from "@/types";

interface BoardState {
    boards: any;
    activeBoardId: number | null;
    selectedBoard: BoardType | null;
    selectedTask: TaskType | Record<string, any>;
}

// Initial state
const initialState: BoardState = {
    boards: boardsData.boards,
    activeBoardId: boardsData.boards[0]?.id_board || null,
    selectedBoard: null,
    selectedTask: {},
};

const boardSlice = createSlice({
    name: "boards",
    initialState,
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
            const updatedBoard = state.boards.filter((board:any) => board.id_board !== id_board);
            state.boards = updatedBoard;
            state.activeBoardId = updatedBoard.length > 0 ? updatedBoard[0].id_board : null;
        },
        editBoard: (state, action: PayloadAction<{ id_board: number; boardName: string; columns: ColumnType[] }>) => {
            const { id_board, boardName, columns } = action.payload;
            const board = state.boards.find((board:any) => board.id_board === id_board);
            if (board) {
                board.board_name = boardName;
                board.column = columns;
            }
        },

        // Column
        addColumn: (state, action: PayloadAction<{ id_board: number; columnName: string }>) => {
            const { id_board, columnName } = action.payload;
            const newID = Date.now();
            const board = state.boards.find((board:any) => board.id_board === id_board);
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
        setSelectedTask: (state, action: PayloadAction<TaskType>) => {
            state.selectedTask = action.payload;
            localStorage.setItem("selectedTask", JSON.stringify(action.payload));
        },
        addTask: (state, action: PayloadAction<{ taskName: string; description: string; id_column: number; subtasks: string[]; id_board: number }>) => {
            const { taskName, description, id_column, subtasks, id_board } = action.payload;
            const newID = Date.now();
            const board = state.boards.find((board:any) => board.id_board === id_board);
            const column = board?.column.find((col:any) => col.id_column === id_column);
            const newSubtasks: SubtaskType[] = subtasks.map((name) => ({
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
        deleteTask: (state, action: PayloadAction<{ task: TaskType; activeBoardId: number }>) => {
            const { task, activeBoardId } = action.payload;
            const board = state.boards.find((b:any) => b.id_board === activeBoardId);
            const column = board?.column.find((col:any) => col.id_column === task.id_column);
            if (column) column.tasks = column.tasks.filter((t:any) => t.id_task !== task.id_task);
        },
        editDescription: (state, action: PayloadAction<{ description: string; task: TaskType; activeBoardId: number }>) => {
            const { description, task, activeBoardId } = action.payload;
            const board = state.boards.find((b:any) => b.id_board === activeBoardId);
            const column = board?.column.find((col:any) => col.id_column === task.id_column);
            if (column) {
                column.tasks = column.tasks.map((t:any) =>
                    t.id_task !== task.id_task ? t : { ...t, description }
                );
            }
            if (state.selectedTask.id_task === task.id_task) {
                state.selectedTask.description = description;
            }
        },
        editTitle: (state, action: PayloadAction<{ title: string; task: TaskType; activeBoardId: number }>) => {
            const { title, task, activeBoardId } = action.payload;
            const board = state.boards.find((b:any) => b.id_board === activeBoardId);
            const column = board?.column.find((col:any) => col.id_column === task.id_column);
            if (column) {
                column.tasks = column.tasks.map((t:any) =>
                    t.id_task !== task.id_task ? t : { ...t, title }
                );
            }
            if (state.selectedTask.id_task === task.id_task) {
                state.selectedTask.title = title;
            }
        },
        changeTaskColumn: (state, action: PayloadAction<{ id_board: number; oldColumnId: number; newColumnId: number; id_task: number }>) => {
            const { id_board, oldColumnId, newColumnId, id_task } = action.payload;
            const board = state.boards.find((b:any) => b.id_board === id_board);
            const oldColumn = board?.column.find((c:any) => c.id_column === oldColumnId);
            const newColumn = board?.column.find((c:any) => c.id_column === newColumnId);
            const task = oldColumn?.tasks.find((t:any) => t.id_task === id_task);
            if (oldColumn && newColumn && task) {
                oldColumn.tasks = oldColumn.tasks.filter((t:any) => t.id_task !== id_task);
                task.id_column = newColumnId;
                newColumn.tasks = [...(newColumn.tasks || []), task];
            }
        },
        reorderTask: (state, action: PayloadAction<{ id_board: number; id_column: number; active: number; over: number }>) => {
            const { id_board, id_column, active, over } = action.payload;
            const board = state.boards.find((b:any) => b.id_board === id_board);
            const column = board?.column.find((col:any) => col.id_column === id_column);
            const tasks = column?.tasks || [];
            const getTaskPosition = (id: number) => tasks.findIndex((t:any) => t.id_task === id);
            const originalPosition = getTaskPosition(active);
            const newPosition = getTaskPosition(over);
            if (column) {
                column.tasks = arrayMove(tasks, originalPosition, newPosition);
            }
        },
        moveTask: (
            state,
            action: PayloadAction<{
                boardId: string;
                oldColumnId: string;
                nextColumnId: string; // Doit être une string, car nous gérons les deux cas ici
                taskId: string;
                index?: any;
            }>
        ) => {
            const { boardId, nextColumnId, oldColumnId, taskId, index } = action.payload;
        
            const board = state.boards.find((b:any) => b.id_board.toString() === boardId);
        
            const oldColumn = board.column.find((col:any) => col.id_column.toString() === oldColumnId);
        
            const nextColumn = nextColumnId
                ? board.column.find((col:any) => col.id_column.toString() === nextColumnId)
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
        addSubtask: (state, action: PayloadAction<{ libelle: string; tasks: TaskType; activeBoardId: number }>) => {
            const { libelle, tasks, activeBoardId } = action.payload;
            const board = state.boards.find((b:any) => b.id_board === activeBoardId);
            const column = board?.column.find((col:any) => col.id_column === tasks.id_column);
            const task = column?.tasks.find((t:any) => t.id_task === tasks.id_task);
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
        updateCheckbox: (state, action: PayloadAction<{ id_subtask: number; tasks: TaskType; activeBoardId: number }>) => {
            const { id_subtask, tasks, activeBoardId } = action.payload;
            const board = state.boards.find((b:any) => b.id_board === activeBoardId);
            const column = board?.column.find((col:any) => col.id_column === tasks.id_column);
            const task = column?.tasks.find((t:any) => t.id_task === tasks.id_task);
            const subtask = task?.subtasks.find((s:any) => s.id_subtask === id_subtask);
            if (subtask) subtask.done = !subtask.done;

            if (state.selectedTask.id_task === tasks.id_task) {
                const selectedSubtask = state.selectedTask.subtasks.find((s: SubtaskType) => s.id_subtask === id_subtask);
                if (selectedSubtask) selectedSubtask.done = !selectedSubtask.done;
            }
        },
        deleteSubtask: (state, action: PayloadAction<{ id_subtask: number; tasks: TaskType; activeBoardId: number }>) => {
            const { id_subtask, tasks, activeBoardId } = action.payload;
            const board = state.boards.find((b:any) => b.id_board === activeBoardId);
            const column = board?.column.find((col:any) => col.id_column === tasks.id_column);
            const task = column?.tasks.find((t:any) => t.id_task === tasks.id_task);
            if (task) task.subtasks = task.subtasks.filter((s:any) => s.id_subtask !== id_subtask);

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
    reorderTask,
    moveTask
} = boardSlice.actions;

export default boardSlice.reducer;
