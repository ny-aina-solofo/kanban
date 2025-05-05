import { openModal } from "../../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedBoard } from "../../redux/boardSlice";
import React from "react";

const DropdownBoard = ({board}) => {
    const dispatch = useDispatch();
    return (
        <div>
            <div className="dropdown">
                <i 
                    className="bi bi-three-dots-vertical ms-3" type="button" 
                    data-bs-toggle="dropdown" aria-expanded="false"
                >
                </i>
                <ul className="dropdown-menu" >
                    <li 
                        className="dropdown-item" type="button"
                        onClick={() =>{
                            dispatch(openModal("editBoardModal"));
                            dispatch(setSelectedBoard(board));
                        }}                    
                    >
                    modifier tableau
                    </li>
                    <li 
                        className="dropdown-item " type="button" 
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
