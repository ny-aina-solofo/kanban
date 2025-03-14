import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { openModal,closeModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";

const DeleteBoardModal = ({}) => {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.boards.selectedBoard);    
    const handleDeleteBoard = (id_board)=>{
        dispatch(closeModal());
        console.log(id_board);
    }
    return (
        <div>
            <Modal show={openModal} onHide={closeModal} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <div className="navbar mb-4">
                        <h5 className="fw-bold text-danger">Supprimer {board.board_name} ?</h5>
                    </div>
                    <p className="mb-3">
                        Tu es sûr de vouloir supprimer {board.board_name} ? 
                        Cette action supprimera tous les colonnes et les tâches qui se trouvent dans ce tableau
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>dispatch(closeModal())}>
                        Annuler
                    </Button>
                    <Button variant="danger" className='ms-3' onClick={()=>{
                        handleDeleteBoard(board.id_board);
                    }}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default DeleteBoardModal;