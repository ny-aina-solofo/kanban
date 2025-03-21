import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { setSelectedTask } from "../../redux/taskSlice";
import ProgressBar from "../ProgressBar";
import AddTaskModal from "../Modal/Task/AddTaskModal";

const Task = ({tasks}) => {
    const dispatch = useDispatch();
    const addTaskModal = useSelector((state) => state.modal.addTaskModal);
    
    return (
        <div>
            {tasks.length > 0 ?(
                <>
                    {tasks.map((task) => (
                        <Link 
                            key={task.id_task}
                            data-testid="view-task"
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
        {addTaskModal.open && <AddTaskModal/>}
        </div>
    )
}

export default Task;
