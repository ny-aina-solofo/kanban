import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveBoard } from "../../redux/boardSlice";
import { openModal } from "../../redux/modalSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const boards = useSelector ((state:any) => state.boards.boards);
    const activeBoardId = useSelector((state:any) => state.boards.activeBoardId);
    
    return (
        <div>
            <div  
                className="fixed-top bg-white h-100 shadow-sm"
                style={{ width: "300px" }}
            >
                <div className="h-100 ">
                    <div className="d-flex ms-4 mt-3 mb-4">
                        <i className="bi bi-kanban"></i>
                        <h5 className="ms-2 fw-bold">Kanban ui</h5>
                    </div>
                    <div className="text-secondary">
                        <div className="mt-3 mb-2 p-2 d-flex flex-row justify-content-between">
                            <span className="ms-4 fw-bold">Your Boards</span>
                            <span
                                data-testid="add-board" 
                                className="mx-3"
                                style={{cursor:"pointer"}}
                                onClick={() => dispatch(openModal("addBoardModal"))}
                            >
                                <i className="bi bi-plus-lg"></i>
                            </span>
                        </div>
                        {boards.map((board:any) => (
                            <div 
                                key={board.id_board} 
                                // className="mb-2 border "
                                className={`mx-3 rounded mb-2 p-2 ${board.id_board === activeBoardId ? 
                                    "bg-primary text-white" 
                                    : 
                                    ""
                                }`}     
                            >
                                <div
                                    data-testid="board-list"
                                    className="mx-4"
                                    // className={`${board.id_board === activeBoardId ? 
                                    //     "fw-bold" 
                                    //     : 
                                    //     ""
                                    // }`}     
                                    onClick={() => dispatch(setActiveBoard(board.id_board)) }
                                >
                                    <i className="bi bi-kanban"></i>
                                    <span className="ms-2" style={{cursor:"pointer"}}>{board.board_name}</span>
                                </div>
                            </div>
                        ))}                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
