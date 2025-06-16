export type SubtaskType = {
    id_subtask: number;
    libelle: string;
    done: boolean;
    id_task: number;
}

export type TaskType = {
    id_task: number;
    title: string;
    description: string;
    id_column: number;
    subtasks: SubtaskType[];
}

export type ColumnType = {
    id_column: number;
    column_name: string;
    id_board: number | null;
    tasks: TaskType[];
}

export type BoardType = {
    id_board: number;
    board_name: string;
    column: ColumnType[];
}

export type Status = "idle" | "loading" | "received" | "rejected";

export type BoardState = {
    boards: any;
    activeBoardId: number | null;
    selectedBoard: BoardType | null;
    selectedTask: TaskType | Record<string, any>;
    status: Status;
    error: string | null;
}

