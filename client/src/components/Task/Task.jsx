import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Task = ({tasks}) => {

    return (
        <div>
            {tasks.map((task) => (
                <div
                    key={task.id_task}
                    className="d-flex flex-column mt-3 mb-3"
                    id="task-row" type="button"
                    // onClick={() => openViewTask(task)}
                >
                    <div
                        className="bg-white border rounded mb-3 p-3"
                        style={{ height: "100%", width: "250px" }}
                    >
                        <h6 className="fw-bolder">{task.title}</h6>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Task;
