import { openModal } from "../../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedBoard } from "../../redux/boardSlice";
import React from "react";
import { BoardType } from "@/types";

interface BoardProps {
    board: BoardType;
}


const DropdownBoard = ({board}:BoardProps) => {
    const dispatch = useDispatch();
    return (
        <div>
            <div className="dropdown">
                <div
                    className="ms-3 p-2 " style={{fontSize:"20px", cursor:"pointer"}} 
                    data-bs-toggle="dropdown" aria-expanded="false"
                >
                    <i className="bi bi-three-dots"></i>
                </div>
                <ul className="dropdown-menu" >
                    <li 
                        className="dropdown-item"
                        style={{cursor:"pointer"}} 
                        onClick={() =>{
                            dispatch(openModal("editBoardModal"));
                            dispatch(setSelectedBoard(board));
                        }}                    
                    >
                    modifier tableau
                    </li>
                    <li 
                        className="dropdown-item "
                        style={{cursor:"pointer"}}  
                        onClick={() =>{
                            dispatch(openModal("deleteBoardModal"));
                            dispatch(setSelectedBoard(board));
                        }}
                    >
                    supprimer tableau
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DropdownBoard;
