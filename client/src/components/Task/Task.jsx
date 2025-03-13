import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { setSelectedTask } from "../../redux/taskSlice";

const Task = ({tasks}) => {
    const dispatch = useDispatch();
    return (
        <div>
            {tasks.map((task) => (
                <Link 
                    key={task.id_task}
                    to={`/view-task/${task.id_task}`}
                    onClick={() => dispatch(setSelectedTask(task))} 
                >
                    <div    
                        className="d-flex flex-column mt-3 mb-3"
                        id="task-row" type="button"
                    >
                        <div
                            className="bg-white border rounded mb-3 p-3"
                            style={{ height: "100%", width: "250px" }}
                        >
                            <h6 className="fw-bolder">{task.title}</h6>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Task;
