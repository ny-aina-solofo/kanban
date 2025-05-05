import React,{ useState ,useLayoutEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import DropdownBoard from "../Dropdown/DropdownBoard";
import { openModal } from '../../redux/modalSlice';
import AddTaskModal from '../Modal/Task/AddTaskModal';


const Navbar = () => {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards.boards);
    const activeBoardId = useSelector(state => state.boards.activeBoardId);
    const activeBoard = boards.find(board => board.id_board === activeBoardId) || [];
    const addTaskModal = useSelector((state) => state.modal.addTaskModal);
    
    return(
        <div>
            <div 
                className="sticky-top bg-white border border-top-0 border-start-0 border-end-0 "
                style={{paddingLeft:"300px"}} 
            >
                <div className="d-flex justify-content-between p-3">
                    <h5 className='fw-bolder'>{activeBoard?.board_name || 'Empty Board'}</h5>
                    <div className="d-flex">
                        <button 
                            className="btn btn-primary rounded-pill" type="button"
                            onClick={()=>{
                                dispatch(openModal("addTaskModal"));
                            }}
                            disabled={activeBoard.length === 0 || activeBoard.column.length === 0}
                        >
                            <i className="bi bi-plus"></i><span className="ms-2">Ajouter</span>
                        </button>
                        <DropdownBoard board={activeBoard || []}/>
                    </div>
                </div>
            </div>
            {addTaskModal.open && <AddTaskModal/>}
        </div>
    )
}
export default Navbar;