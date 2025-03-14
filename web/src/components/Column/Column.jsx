import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Task from "../Task/Task";
import DropdownColumn from "../Dropdown/DropdownColumn";
import TaskLength from "../Task/TaskLength";

const Column = ({columns}) => {
    return (
        <div>
            <div style={{ width: 100 + "%", paddingLeft:"300px" }}>
                <div className="mt-4 d-flex flex-row">
                    <div className="d-flex flex-row" id="kanban-column">
                        {columns.map(col => (
                            <div 
                                key={col.id_column} 
                                className="mx-3 border rounded p-3"
                                // style={{height:"inherit"}}
                            >
                                <div className="d-flex justify-content-between ">
                                    <div className="d-flex flex-row ">
                                        <p className="">{col.column_name}</p>
                                        <TaskLength tasks={col?.tasks || []}/>
                                    </div>
                                    <DropdownColumn col={col}/>
                                </div>
                                <Task 
                                    tasks={col?.tasks || []}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className="bg-white border rounded mx-3 p-3" type="button" 
                        // onClick={openAddForm}
                        style={{width:"252px", height:"60px"}}
                    >
                        <div className="">
                            <i className="bi bi-plus"></i>
                            <span className="ms-3">New Column</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Column;
