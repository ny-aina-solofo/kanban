import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Task from "../Task/Task";
import TaskLength from "../Task/TaskLength";

const Column = ({columns}) => {
    return (
        <div>
            <div style={{ paddingLeft:"300px",overflowX:"scroll",height:"100%" }}>
                <div className="mt-4 d-flex flex-row">
                    <div className="d-flex flex-row" id="kanban-column">
                        {columns.map(col => (
                            <div 
                                key={col.id_column} 
                                className="ms-3"
                            >
                                <div className="d-flex justify-content-between ">
                                    <div className="d-flex flex-row ">
                                        <p className="ms-3">{col.column_name}</p>
                                        {/* <TaskLength tasks={col?.tasks || []}/> */}
                                    </div>
                                </div>
                                <Task 
                                    tasks={col?.tasks || []}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div>
                            <p>&nbsp;</p>
                        </div>
                        <div
                            className="bg-white border ms-3 rounded p-3" type="button" 
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
        </div>
    )
}

export default Column;
