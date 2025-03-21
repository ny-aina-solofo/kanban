import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { openModal,closeModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";

const DeleteTaskModal = ({}) => {
    const dispatch = useDispatch();
    const selectedTask = useSelector((state) => state.tasks.selectedTask);    
    
    const handleDeleteTask = (id_task)=>{
        dispatch(closeModal());
        console.log(id_task);
    }
    return (
        <div>
            <Modal show={openModal} onHide={closeModal} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <h5 className="fw-bold text-danger mb-4">Supprimer {selectedTask.title} ?</h5>
                    <p className="mb-3">
                        Tu es sûr de vouloir supprimer {selectedTask.title} ? 
                        Cette action supprimera tous les colonnes et les tâches qui se trouvent dans ce tableau
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>dispatch(closeModal())}>
                        Annuler
                    </Button>
                    <Button variant="danger" className='ms-3' onClick={()=>{
                        handleDeleteTask(selectedTask.id_task);
                    }}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default DeleteTaskModal;