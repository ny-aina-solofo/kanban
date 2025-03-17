import React,{ useState ,useLayoutEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import DropdownBoard from "../Dropdown/DropdownBoard";


const Navbar = () => {
    const boards = useSelector((state) => state.boards.boards);
    const activeBoardId = useSelector(state => state.boards.activeBoardId);
    const activeBoard = boards.find(board => board.id_board === activeBoardId);

    return(
        <div>
            <div 
                className="sticky-top bg-white border border-top-0 border-start-0 border-end-0 "
                style={{paddingLeft:"300px"}} 
            >
                <div className="d-flex justify-content-between p-2">
                    <h5>{activeBoard.board_name}</h5>
                    <div className="d-flex">
                        <button className="btn btn-secondary rounded-pill" type="button">
                            <i className="bi bi-plus"></i><span className="ms-2">Ajouter</span>
                        </button>
                        <DropdownBoard board={activeBoard}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;