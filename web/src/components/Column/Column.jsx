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

const Column = ({columns}) => {
    const dispatch = useDispatch();
    const tasks = columns?.tasks || []; 
    const items = tasks.map((task) => task.id_task);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event) => {
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
        <div className="ms-3 border p-3">
            <div className="d-flex justify-content-between ">
                <div className="d-flex flex-row ">
                    <h6 className="ms-3">{columns.column_name}</h6>
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
