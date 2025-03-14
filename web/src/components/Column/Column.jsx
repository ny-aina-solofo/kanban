import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Task from "../Task/Task";

const Column = ({columns}) => {
    return (
        <div>
            <div style={{ width: 100 + "%", paddingLeft:"300px" }}>
                <div className="mt-4 d-flex flex-row">
                    <div className="d-flex flex-row " id="kanban-column">
                    {columns.map(col => (
                        <div key={col.id_column} className="mx-3 p-3">
                            <div className="d-flex flex-row justify-content-between">
                                <div className="d-flex">
                                    <p className="">{col.column_name}</p>
                                </div>
                            </div>
                            <Task 
                                tasks={col?.tasks || []}
                            />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Column;
