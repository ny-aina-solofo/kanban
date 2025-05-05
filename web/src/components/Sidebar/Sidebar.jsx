import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveBoard } from "../../redux/boardSlice";
import { openModal } from "../../redux/modalSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const boards = useSelector (state => state.boards.boards);
    const activeBoardId = useSelector(state => state.boards.activeBoardId);
    
    return (
        <div>
            <div  
                className="fixed-top bg-white h-100 border border-top-0 border-start-0 border-bottom-0"
                style={{ width: "300px" }}
            >
                <div className="h-100 ">
                    <div className="ms-4 mt-3 mb-4">KANBAN-APP</div>
                    <div className="">
                        <div className="mt-3 mb-2 p-2 d-flex flex-row justify-content-between">
                            <span className="ms-4">Your Board</span>
                            <span
                                data-testid="add-board" 
                                className="mx-3"
                                type="button" 
                                onClick={() => dispatch(openModal("addBoardModal"))}
                            >
                                <i className="bi bi-plus-lg">
                            </i></span>
                        </div>
                        {boards.map(board => (
                            <div 
                                key={board.id_board} 
                                // className="mb-2 border "
                                className={`mb-2 p-2 ${board.id_board === activeBoardId ? 
                                    "bg-primary text-white" 
                                    : 
                                    ""
                                }`}     
                            >
                                <div
                                    data-testid="board-list"
                                    // className={`${board.id_board === activeBoardId ? 
                                    //     "fw-bold" 
                                    //     : 
                                    //     ""
                                    // }`}     
                                    onClick={() => dispatch(setActiveBoard(board.id_board)) }
                                >
                                    <span className="ms-4" type = "button">{board.board_name}</span>
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
