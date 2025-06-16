import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { openModal,closeModal } from '../../../redux/modalSlice';
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from '../../../redux/boardSlice';
import { useNavigate } from 'react-router';
import { RootState } from '@/redux/store';
import { TaskType } from '@/types';

const DeleteTaskModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedTask = useSelector((state:RootState) => state.boards.selectedTask);    
    const activeBoardId = useSelector((state:RootState) => state.boards.activeBoardId);
    const showTaskModal = useSelector((state:RootState) => state.modal.deleteTaskModal);

    const handleDeleteTask = (task:TaskType | Record<string, any>)=>{
        dispatch(deleteTask({task,activeBoardId}));
        dispatch(closeModal('deleteTaskModal'));
        navigate(-1);
        // console.log(selectedTask.id_column);
    }
    return (
        <div>
            <Modal show={showTaskModal.open} onHide={()=>dispatch(closeModal('deleteTaskModal'))} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <h5 className="fw-bold text-danger mb-4">Supprimer {selectedTask.title} ?</h5>
                    <p className="mb-3">
                        Tu es sûr de vouloir supprimer {selectedTask.title} ? 
                        Cette action supprimera tous les colonnes et les tâches qui se trouvent dans ce tableau
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>dispatch(closeModal('deleteTaskModal'))}>
                        Annuler
                    </Button>
                    <Button variant="danger" className='ms-3' onClick={()=>{
                        handleDeleteTask(selectedTask);
                    }}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default DeleteTaskModal;