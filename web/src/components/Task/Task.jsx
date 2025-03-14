import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { setSelectedTask } from "../../redux/taskSlice";
import ProgressBar from "../ProgressBar";

const Task = ({tasks}) => {
    const dispatch = useDispatch();
    return (
        <div>
            {tasks.length > 0 ?(
                <>
                    {tasks.map((task) => (
                        <Link 
                            key={task.id_task}
                            to={`/view-task/${task.id_task}`}
                            onClick={() => dispatch(setSelectedTask(task))} 
                        >
                            <div    
                                className="d-flex flex-column mb-3"
                                id="task-row" type="button"
                            >
                                <div
                                    className="bg-white border rounded p-3"
                                    style={{ height: "100%", width: "250px" }}
                                >
                                    <h6 className="fw-bolder">{task.title}</h6>
                                    <ProgressBar subtasks={task?.subtasks || []} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </>
            ) : (
                <div style={{ height: "100%", width: "250px" }}></div>
            )}
            <div 
                className="" type="button" 
                // onClick={openAddModal}
            >
                <div className="">
                    <i className="bi bi-plus"></i>
                    <span className="ms-3">New Task</span>
                </div>
            </div>
        </div>
    )
}

export default Task;
