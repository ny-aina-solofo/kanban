import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSelectedTask } from "../../redux/boardSlice";
import ProgressBar from "../ProgressBar";
import { TaskType } from "@/types";

interface TaskProps {
    tasks: TaskType;
}

const Task = ({tasks}:TaskProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const viewTask = () =>{
        dispatch(setSelectedTask(tasks));
        navigate(`/view-task/${tasks.id_task}`);
        console.log("ici");
        
    }
    return (
        <div onPointerDown={(e) => e.stopPropagation()} >
            <div
                data-testid="view-task"
                className="bg-white rounded p-3 mb-3 shadow-sm"
                style={{ height: "100%", width: "250px",cursor:"pointer" }}
                onClick={viewTask}
            >
                <h6 className="fw-bolder">{tasks.title}</h6>
                {/* <p>{tasks.description}</p> */}
                <ProgressBar subtasks={tasks?.subtasks || []} />
            </div>
        </div>
    )
}

export default Task;
