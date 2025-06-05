import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSelectedTask } from "../../redux/boardSlice";
import ProgressBar from "../ProgressBar";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
    tasks: any;
}


const Task = ({tasks}:TaskProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {attributes, listeners, setNodeRef, transform,transition} = useSortable({id: tasks.id_task});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
    };

    const viewTask = () =>{
        dispatch(setSelectedTask(tasks));
        navigate(`/view-task/${tasks.id_task}`);
    }
    return (
        <div ref={setNodeRef} style={style}  {...attributes} >
            <div
                data-testid="view-task"
                className="bg-white rounded p-3 mb-3 shadow-sm"
                style={{ height: "100%", width: "250px",cursor:"pointer" }}
                onClick={viewTask}
            >
                <h6 className="fw-bolder" {...listeners}>{tasks.title}</h6>
                {/* <p>{tasks.description}</p> */}
                <ProgressBar subtasks={tasks?.subtasks || []} />
            </div>
        </div>
    )
}

export default Task;
