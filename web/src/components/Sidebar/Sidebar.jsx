import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveBoard } from "../../redux/boardSlice";
import { openModal } from "../../redux/modalSlice";
import DropdownBoard from "../Dropdown/DropdownBoard";

const Sidebar = () => {
    const dispatch = useDispatch();
    const activeBoardId = useSelector(state => state.boards.activeBoardId);
    const boards = useSelector (state => state.boards.boards);
    const handleActiveBoard = (boardId) => {
        dispatch(setActiveBoard(boardId));
    };  
    return (
        <div>
            <div  
                className="fixed-top bg-white h-100 border border-top-0 border-start-0 border-bottom-0"
                style={{ width: "300px" }}
            >
                <div className="h-100 ">
                    <div className="text-dark mt-2 h5 ">
                        <span className="ms-4">Kanban-app</span>
                    </div>
                    <div className="mt-4 p-4">
                        <div className="mb-4 navbar">
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
                                className="mb-2 p-2 border rounded d-flex justify-content-between"
                                type = "button"
                            >
                                <div
                                    className={`text-dark ${board.id_board === activeBoardId ? "fw-bold" : ""}`}     
                                    onClick={() => handleActiveBoard(board.id_board)}
                                >
                                    {/* <i className="bi bi-kanban"></i> */}
                                    <span className="ms-3">{board.board_name}</span>
                                </div>
                                <DropdownBoard board = {board} />                                    
                            </div>
                        ))}                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
