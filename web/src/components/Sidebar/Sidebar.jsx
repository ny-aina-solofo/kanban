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
                    <div className="p-4">
                        <div className="mb-2 d-flex justify-content-between">
                            <span className="">Your Board</span>
                            <span 
                                className=""
                                type="button" 
                                onClick={() => dispatch(openModal("addBoardModal"))}
                            >
                                <i className="bi bi-plus-lg">
                            </i></span>
                        </div>
                        {boards.map(board => (
                            <div 
                                key={board.id_board} 
                                className="mb-2 d-flex justify-content-between"
                            >
                                <div
                                    className={`text-dark ${board.id_board === activeBoardId ? "fw-bold" : ""}`}     
                                    onClick={() => dispatch(setActiveBoard(board.id_board)) }
                                >
                                    <span className="ms-3" type = "button">{board.board_name}</span>
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
