import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { openModal,closeModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";
import { addBoard } from '../../../redux/boardSlice';
import { RootState } from '@/redux/store';

const AddBoardModal = ({}) => {
    const dispatch = useDispatch();
    const [boardName,setBoardName]= useState('');

    const showBoardModal = useSelector((state:RootState) => state.modal.addBoardModal);

    const handleAddBoard = ()=>{
        if (!boardName) return;
        dispatch(addBoard(boardName));
        setBoardName('');
        dispatch(closeModal('addBoardModal'));
    }
    const cancelAddBoard = ()=>{
        setBoardName('');
        dispatch(closeModal('addBoardModal'));
    }
    return(
        <div >   
            <Modal show={showBoardModal.open} onHide={() => dispatch(closeModal('addBoardModal'))} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <h5 className='fw-bold mb-5'>Ajouter un tableau</h5>
                    <label className="form-label">Nom</label>
                    <input 
                        type="text" className="form-control" name="" id="" 
                        aria-describedby="helpId" placeholder="Entrez un nom"
                        value={boardName} onChange={(e)=>setBoardName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelAddBoard}>
                        Annuler
                    </Button>
                    <Button variant="primary" className='ms-3' onClick={handleAddBoard}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>          
        </div>
    )
}
export default AddBoardModal; 