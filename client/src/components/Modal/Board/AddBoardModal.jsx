import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { openModal,closeModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";

const AddBoardModal = ({}) => {
    const dispatch = useDispatch();
    const [boardName,setBoardName]= useState('');
    
    const handleAddBoard = ()=>{
        setBoardName('');
        dispatch(closeModal());
    }
    const cancelAddBoard = ()=>{
        setBoardName('');
        dispatch(closeModal());
    }
    return(
        <div >   
            <Modal show={openModal} onHide={closeModal} backdrop="static" keyboard={false}>
                <Modal.Header>

                </Modal.Header>
                <Modal.Body className="mb-4">
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
                    <Button variant="danger" className='ms-3' onClick={handleAddBoard}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>          
        </div>
    )
}
export default AddBoardModal; 