import Task from "../Task/Task";
import {
	AnimateLayoutChanges,
	defaultAnimateLayoutChanges,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { TaskType } from "@/types";


interface TaskProps {
    tasks: TaskType;
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
	defaultAnimateLayoutChanges({ ...args, wasDragging: true });

const DraggableTask = React.memo(({ tasks }: TaskProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id:`${tasks.id_task}`,
		animateLayoutChanges,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
    

	return (
		<div ref={setNodeRef} style={style} {...listeners}  {...attributes}>
			<Task tasks={tasks}/>
		</div>
	);
});

export default DraggableTask;