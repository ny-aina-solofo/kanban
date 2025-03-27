import { createSlice,nanoid } from "@reduxjs/toolkit";
import boards from "../data.json";

const initialState = {
    boards: boards.boards,
    activeBoardId : boards.boards[0].id_board,
    selectedBoard : null,
    selectedTask : {},
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
        deleteBoard : (state, action) => {
            const id_board = action.payload;
            state.boards = state.boards.filter((board) => board.id_board !== id_board);
            state.activeBoardId = initialState.activeBoardId;
        },
        editBoard : (state, action) => {
            const { id_board, boardName, columns } = action.payload;
            const board = state.boards.find((board) => board.id_board === id_board);
            if (board) {
                board.board_name = boardName;
                board.column = columns;
            }
        },

        // Column :
        addColumn : (state, action) => {
            const {id_board,columnName} = action.payload;
            const newID = nanoid();
            const board = state.boards.find((board) => board.id_board === id_board);
            // console.log(id_board,columnName);
            const column = board?.column || [];
            const newColumn = {id_column:newID, column_name:columnName, id_board:id_board, tasks:[]};
            column.push(newColumn);            
        },

        // Task :
        setSelectedTask : (state,action) => {
            state.selectedTask = action.payload;
            localStorage.setItem("selectedTask", JSON.stringify(action.payload));
        },
        addTask : (state, action) => {
            const { taskName,description,id_column,subtasks,id_board } = action.payload;
            const newID = Date.now();
            const board = state.boards.find((board) => board.id_board === id_board);
            const column = board.column.find((col) => col.id_column === id_column);
            const newSubtasks = subtasks.map((name) => {
                return {id_subtask : Date.now(),libelle : name,done : false,id_task : newID,};
            });
            const newTask = {
                id_task : newID,
                title : taskName,
                description : description,
                id_column : id_column,
                subtasks : newSubtasks
            };
            column.tasks = [...(column.tasks || []), newTask];            
        },
        deleteTask: (state, action) => {
            const {task,activeBoardId} = action.payload;
            const board = state.boards.find((board) => board.id_board === activeBoardId);
            const column = board.column.find((col) => col.id_column === task.id_column);
            column.tasks = column.tasks.filter((t) => t.id_task !== task.id_task);
        },
        editDescription: (state, action) => {
            const {description,task,activeBoardId} = action.payload;
            const board = state.boards.find((board) => board.id_board === activeBoardId);
            const column = board.column.find((col) => col.id_column === task.id_column);
            column.tasks = column.tasks.map((t) => 
                t.id_task !== task.id_task ? t : {...t,description : description}
            );
            // Met à jour selectedTask directement après modification
            if (state.selectedTask.id_task === task.id_task) {
                state.selectedTask.description = description;
            }
        },
        editTitle: (state, action) => {
            const {title,task,activeBoardId} = action.payload;
            const board = state.boards.find((board) => board.id_board === activeBoardId);
            const column = board.column.find((col) => col.id_column === task.id_column);
            column.tasks = column.tasks.map((t) => 
                t.id_task !== task.id_task ? t : {...t,title : title}
            );
            // Mis à jour état locale
            if (state.selectedTask.id_task === task.id_task) {
                state.selectedTask.title = title;
            }
        },

        // Subtask :
        addSubtask : (state, action) => {
            const {libelle,tasks,activeBoardId} = action.payload;
            const board = state.boards.find((board) => board.id_board === activeBoardId);
            const column = board.column.find((col) => col.id_column === tasks.id_column);
            const task = column.tasks.find((t) => t.id_task === tasks.id_task);
            const newSubtasks = {
                id_subtask : Date.now(),
                libelle : libelle,
                done : false ,
                id_task : task.id_task
            };
            task.subtasks = [...(task.subtasks || []), newSubtasks];

            if (state.selectedTask.id_task === tasks.id_task) {
                state.selectedTask.subtasks = [...(state.selectedTask.subtasks || []),newSubtasks];
            }
        }, 
        updateCheckbox: (state, action) => {
            const {id_subtask,tasks,activeBoardId} = action.payload;
            const board = state.boards.find((board) => board.id_board === activeBoardId);
            const column = board.column.find((col) => col.id_column === tasks.id_column);
            const task = column.tasks.find((t) => t.id_task === tasks.id_task);
            const subtask = task.subtasks.find((s) => s.id_subtask === id_subtask);
            subtask.done = !subtask.done
            
            if (state.selectedTask.id_task === tasks.id_task) {
                const selectedSubtask = state.selectedTask.subtasks.find((s) => 
                    s.id_subtask === id_subtask
                );
                selectedSubtask.done = !selectedSubtask.done;
            }
        },
        deleteSubtask: (state, action) => {
            const {id_subtask,tasks,activeBoardId} = action.payload;
            const board = state.boards.find((board) => board.id_board === activeBoardId);
            const column = board.column.find((col) => col.id_column === tasks.id_column);
            const task = column.tasks.find((t) => t.id_task === tasks.id_task);
            task.subtasks = task.subtasks.filter((s) => s.id_subtask !== id_subtask);
            
            if (state.selectedTask.id_task === tasks.id_task) {
                state.selectedTask.subtasks = state.selectedTask.subtasks.filter((s) => 
                    s.id_subtask !== id_subtask
                );
            }
        }


            
    }
})

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
    deleteSubtask
} = boardSlice.actions;
export default boardSlice.reducer;



