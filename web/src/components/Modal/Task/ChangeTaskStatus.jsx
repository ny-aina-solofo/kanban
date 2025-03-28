import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { openModal,closeModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { changeTaskColumn } from '../../../redux/boardSlice';

const ChangeTaskStatus = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector((state) => state.boards.selectedTask);    
    const boards = useSelector((state) => state.boards.boards);
    const activeBoardId = useSelector(state => state.boards.activeBoardId);
    const activeBoard = boards.find(board => board.id_board === activeBoardId);
    const columns = activeBoard?.column || [] ;
    const navigate = useNavigate();
    
    const [status, setStatus] = useState(selectedTask.id_column);
    
    const handleChange = ()=>{
        dispatch(changeTaskColumn({ 
            id_board : activeBoardId, 
            oldColumnId : selectedTask.id_column, 
            newColumnId : status, 
            id_task : selectedTask.id_task 
        }));
        dispatch(closeModal());
        navigate(-1);
    }
    return (
        <div>
            <Modal show={openModal} onHide={closeModal} backdrop="static" keyboard={false} animation={false}>
                <Modal.Body>
                    <div className="mb-4">
                        <label className="form-label">basculer vers</label>
                        <div className="dropdown">
                            <div 
                                className="btn border  w-100 d-flex justify-content-between align-items-center" 
                                type="button" 
                                data-bs-toggle="dropdown" aria-expanded="false"
                            >
                                <span>{columns.find(col => col.id_column === status)?.column_name || ''}</span>
                                <i className="bi bi-chevron-down"></i>
                            </div>
                            <ul className="dropdown-menu w-100 p-2" >
                                {columns.map(col => (
                                    <li  
                                        className={
                                            `p-2
                                            ${col.id_column === status ? 'bg-light' : ''}`
                                        }
                                        type="button" 
                                        key={col.id_column} 
                                        onClick={() =>{
                                            setStatus(col.id_column);
                                        }}
                                    >
                                        <span className=''> 
                                            {col.id_column === selectedTask.id_column && <i className="bi bi-check2"></i>} 
                                        </span>
                                        <span className='ms-3'>
                                            {col.column_name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button 
                            className="btn btn-primary mt-3" 
                            onClick={handleChange}
                        >
                        basculer
                    </button>
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    )
}
export default ChangeTaskStatus;