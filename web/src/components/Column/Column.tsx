"use client"

import {
    DndContext, KeyboardSensor, PointerSensor,TouchSensor,closestCorners,useSensor, useSensors,
} from "@dnd-kit/core";
import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Task from "../Task/Task";
import { 
    SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy 
} from "@dnd-kit/sortable";
import { reorderTask } from "../../redux/boardSlice";

interface TaskType {
    id_task: number;
    [key: string]: any;
}

interface ColumnType {
    id_column: number;
    id_board: number;
    column_name: string;
    tasks: TaskType[];
}

interface ColumnProps {
      columns: ColumnType;
}

const Column = ({columns}:ColumnProps) => {
    const dispatch = useDispatch();
    const tasks = columns?.tasks || []; 
    const items = tasks.map((task:any) => task.id_task);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event:any) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
        dispatch(reorderTask({
            id_board : columns.id_board,
            id_column : columns.id_column,
            active : active.id,
            over : over.id, 
        }));
    }

    return (
        <div className="ms-4 mt-3">
            <div className="d-flex justify-content-between pb-2 border border-3 
                 border-top-0 border-start-0 border-end-0">
                <div className="d-flex flex-row ">
                    <h6 className="fw-bold text-secondary">{columns.column_name}</h6>
                    <span className="ms-3 badge bg-white text-dark">{tasks.length}</span>
                </div>
            </div>
            {tasks.length > 0 ?(
                <DndContext  sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                    <SortableContext items={items}  strategy={verticalListSortingStrategy}>
                        <div className="mt-3">
                            {tasks.map((task) =>
                                <Task 
                                    key={task.id_task}
                                    tasks={task}
                                />
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            ) : (
                <div style={{ height: "100%", width: "250px" }}></div>
            )}
        </div>
    )
}

export default Column;
