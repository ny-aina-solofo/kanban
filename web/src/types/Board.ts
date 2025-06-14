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
    id_board: number;
    tasks: TaskType[];
}

export type BoardType = {
    id_board: number;
    board_name: string;
    column: ColumnType[];
}

