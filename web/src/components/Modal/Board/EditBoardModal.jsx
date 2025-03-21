import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { openModal,closeModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";

const EditBoardModal = () => {
    const dispatch = useDispatch();
    const selectedBoard = useSelector((state) => state.boards.selectedBoard);    
    const columns = selectedBoard?.column || [] ;
    
    const handleEditBoard = (id_board)=>{
        dispatch(closeModal());
        console.log(id_board);
    }
 
    return(
        <div>
            <Modal show={openModal} onHide={closeModal} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <h5 className='fw-bold mb-4'>Modifier {selectedBoard.board_name}</h5>
                    <div className="mb-4">
                        <label className="form-label">Nom</label>
                        <input 
                            type="text" className="form-control" name="" id="" 
                            aria-describedby="helpId" 
                            // placeholder={board.board_name}
                            value={selectedBoard.board_name} 
                            // onChange={(e)=>setNewBoardName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Colonnes</label>
                        {columns.length > 0 ? (
                            <div className="">
                                {columns.map(col => (
                                    <div 
                                        key={col.id_column} 
                                        className='mb-3'
                                    >
                                        <div className="d-flex flex-row">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="" id="" aria-describedby="helpId" 
                                                value={col.column_name}
                                            />
                                            <i className="bi bi-x-lg ms-2 mt-2" type="button"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <button 
                        className='btn btn-primary form form-control' 
                        onClick={()=>{
                            handleEditBoard(selectedBoard.id_board);
                        }}
                    >
                        Enregistrer
                    </button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditBoardModal;