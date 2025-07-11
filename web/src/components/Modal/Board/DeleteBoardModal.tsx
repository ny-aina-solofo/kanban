import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { openModal,closeModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";
import { deleteBoard } from '../../../redux/boardSlice';
import { RootState } from '@/redux/store';

const DeleteBoardModal = ({}) => {
    const dispatch = useDispatch();
    const selectedBoard = useSelector((state:RootState) => state.boards.selectedBoard);    
    // Récupérer l'état d'ouverture du modal
    const showDeleteBoardModal = useSelector((state:RootState) => state.modal.deleteBoardModal.open);

    const handleDeleteBoard = (id_board:number)=>{
        dispatch(deleteBoard(id_board));
        dispatch(closeModal('deleteBoardModal'));
        // console.log(id_board);
    }
    return (
        <div>
            <Modal show={showDeleteBoardModal} onHide={() => dispatch(closeModal('deleteBoardModal'))} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <h5 className="fw-bold text-danger mb-4">Supprimer {selectedBoard?.board_name || ""} ?</h5>
                    <p className="mb-3">
                        Tu es sûr de vouloir supprimer {selectedBoard?.board_name  || ""} ? 
                        Cette action supprimera tous les colonnes et les tâches qui se trouvent dans ce tableau
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>dispatch(closeModal('deleteBoardModal'))}>
                        Annuler
                    </Button>
                    <Button variant="danger" className='ms-3' onClick={()=>{
                        handleDeleteBoard(selectedBoard?.id_board  || 0);
                    }}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default DeleteBoardModal;